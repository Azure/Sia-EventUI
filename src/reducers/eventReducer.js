import { combineReducers } from 'redux'
import paginated from 'paginated-redux'
import moment from 'moment'
import filter from './filterReducer'
import * as eventActions from '../actions/eventActions'
import * as filterActions from '../actions/filterActions'
import { mergeWithOverwrite, buildFetching } from './reducerHelpers'

const defaultEventCollection = []

const makeSearchable = (event) => ({
    ...event,
    filterableIncidentId: event.incidentId.toString()
})

const pageArgs = {
    defaultPage: 1,
    defaultSortOrder: 'desc',
    defaultSortBy: 'occurred',
    defaultPer: 10,
    defaultFilter: '',
    defaultTotal: 0
}

const addEventsToState = (state, events) => mergeWithOverwrite(state, events.map(event => makeSearchable(event)))

export const rawList = (state = defaultEventCollection, action) => {
    switch(action.type){
        case eventActions.RECEIVE_EVENT:
        case eventActions.POST_EVENT_SUCCEED:
            return addEventsToState(state, [{...action.event, timeReceived: moment()}])
        case eventActions.RECEIVE_EVENTS:
            return addEventsToState(state, action.events)
        case filterActions.CHANGE_EVENT_FILTER:
            return defaultEventCollection
        default:
            return state
    }
}

export const fetching = buildFetching({
    try: eventActions.REQUEST_EVENT,
    succeed: eventActions.RECEIVE_EVENT,
    fail: eventActions.RECEIVE_EVENT_FAILURE
})

export const pages = paginated(rawList, eventActions.pagination.types, pageArgs)

export default (defaultFilter) => combineReducers({
    fetching,
    pages,
    filter: filter(defaultFilter)
})