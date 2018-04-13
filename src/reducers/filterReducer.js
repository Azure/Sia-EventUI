import { combineReducers } from 'redux'
import { DateTime } from 'luxon'

import * as filterActions from 'actions/filterActions'
import dateTimeReducer from 'reducers/reducerHelpers/dateTime'

const initialFilter = {
  incidentId: null,
  eventTypes: [],
  startTime: null,
  endTime: null,
  dataSearch: null
}

export const incidentId = (defaultIncidentId = initialFilter.incidentId) => (state = defaultIncidentId, action) => {
  switch (action.type) {
    case filterActions.CLEAR_EVENT_FILTER_INCIDENTID:
      return null
    case filterActions.UPDATE_EVENT_FILTER_INCIDENTID:
      return state === action.incidentId
        ? state
        : action.incidentId
    default:
      return state
  }
}

export const eventTypes = (defaultEventTypes = []) => (state = defaultEventTypes, action) => {
  switch (action.type) {
    case filterActions.ADD_EVENT_TYPE_TO_FILTER:
      return state.includes(action.eventTypeId)
        ? state
        : state.concat(action.eventTypeId)
    case filterActions.REMOVE_EVENT_TYPE_FROM_FILTER:
      return state.includes(action.eventTypeId)
        ? state.filter(eventTypeId => eventTypeId !== action.eventTypeId)
        : state
    default:
      return state
  }
}

export const startTime = (defaultStartTime) => dateTimeReducer(
  defaultStartTime ? defaultStartTime.split('T')[1] : DateTime.utc().toISOTime().toString(),
  defaultStartTime ? defaultStartTime.split('T')[0] : DateTime.utc().minus({day: 1}).toISODate().toString(),
  filterActions.UPDATE_FILTER_START_TIME,
  filterActions.UPDATE_FILTER_START_DATE
)

export const endTime = (defaultEndTime) => dateTimeReducer(
  defaultEndTime ? defaultEndTime.split('T')[1] : DateTime.utc().toISOTime().toString(),
  defaultEndTime ? defaultEndTime.split('T')[0] : DateTime.utc().plus({day: 1}).toISODate().toString(),
  filterActions.UPDATE_FILTER_END_TIME,
  filterActions.UPDATE_FILTER_END_DATE
)

export const dataSearch = (defaultDataSearch = initialFilter.dataSearch) => (state = defaultDataSearch, action) => {
  switch (action.type) {
    case filterActions.UPDATE_DATASEARCH:
      if (action.dataSearch) {
        return action.dataSearch
      } else return state
    default:
      return state
  }
}

export const filter = (defaultFilter = initialFilter) => {
  return combineReducers({
    incidentId: incidentId(defaultFilter.incidentId),
    eventTypes: eventTypes(defaultFilter.eventTypes),
    startTime: startTime(defaultFilter.startTime),
    endTime: endTime(defaultFilter.endTime),
    dataSearch: dataSearch(defaultFilter.dataSearch)
  })
}

export default filter
