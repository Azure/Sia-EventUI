import { combineReducers } from 'redux'
import paginated from 'paginated-redux'
import { DateTime } from 'luxon'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // default: localStorage if web, AsyncStorage if react-native

import filter from 'reducers/filterReducer'
import * as filterActions from 'actions/filterActions'
import * as eventActions from 'actions/eventActions'
import { mergeWithOverwrite } from 'reducers/reducerHelpers/merge'
import buildFetching from 'reducers/reducerHelpers/fetching'
import buildError from 'reducers/reducerHelpers/error'
import { isChromeExtension } from 'services/notificationService'

const defaultEventCollection = []

const makeSearchable = (event) => ({
  ...event,
  filterableIncidentId: event.incidentId.toString()
})

const addEventsToState = (state, events) => mergeWithOverwrite(state, events.map(event => makeSearchable(event)))

export const rawList = (state = defaultEventCollection, action) => {
  switch (action.type) {
    case eventActions.RECEIVE_EVENT:
    case eventActions.POST_EVENT_SUCCEED:
      return addEventsToState(state, [{...action.event, timeReceived: DateTime.utc()}])
    case eventActions.RECEIVE_EVENTS:
      return addEventsToState(state, action.events)
    case filterActions.CLEAR_EVENT_FILTER_INCIDENTID: // Fallthrough
    case filterActions.UPDATE_EVENT_FILTER_INCIDENTID:
    case eventActions.CLEAR_EVENTS:
      return defaultEventCollection
    default:
      return state
  }
}

const actionSet = {
  try: eventActions.REQUEST_EVENT,
  succeed: eventActions.RECEIVE_EVENT,
  fail: eventActions.RECEIVE_EVENT_FAILURE
}

const fetching = buildFetching(actionSet)

const error = buildError(actionSet)

const pageArgs = {
  defaultPage: 1,
  defaultSortOrder: 'desc',
  defaultSortBy: 'occurred',
  defaultPer: 25,
  defaultFilter: '',
  defaultTotal: 0
}

export const pages = paginated(rawList, eventActions.pagination.types, pageArgs)

export default (defaultFilter) => combineReducers({
  fetching,
  error,
  pages,
  filter: isChromeExtension()
    ? persistReducer({ key: 'eventFilter', storage }, filter(defaultFilter))
    : filter(defaultFilter)
})
