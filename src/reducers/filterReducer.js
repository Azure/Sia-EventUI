import * as filterActions from 'actions/filterActions'
import { combineReducers } from 'redux'

export const incidentId = (defaultIncidentId) => (state = defaultIncidentId, action) => {
  switch (action.type) {
    case filterActions.CLEAR_EVENT_FILTER_INCIDENTID:
      return null
    case filterActions.CHANGE_EVENT_FILTER:
      if (action.filter.incidentId) {
        return action.filter.incidentId
      } else return state
    default:
      return state
  }
}

export const eventTypes = (defaultEventTypes) => (state = defaultEventTypes, action) => {
  switch (action.type) {
    case filterActions.CHANGE_EVENT_FILTER:
      if (action.filter.eventTypes) {
        return action.filter.eventTypes
      } else return state
    default:
      return state
  }
}

export const startTime = (defaultStartTime) => (state = defaultStartTime, action) => {
  switch (action.type) {
    case filterActions.CHANGE_EVENT_FILTER:
      if (action.filter.startTime) {
        return action.filter.startTime
      } else return state
    default:
      return state
  }
}

export const endTime = (defaultEndTime) => (state = defaultEndTime, action) => {
  switch (action.type) {
    case filterActions.CHANGE_EVENT_FILTER:
      if (action.filter.endTime) {
        return action.filter.endTime
      } else return state
    default:
      return state
  }
}

export const dataSearch = (defaultDataSearch) => (state = defaultDataSearch, action) => {
  switch (action.type) {
    case filterActions.CHANGE_EVENT_FILTER:
      if (action.filter.DataSearch) {
        return action.filter.DataSearch
      } else return state
    default:
      return state
  }
}

export const ticketId = (defaultTicketId) => (state = defaultTicketId, action) => {
  switch (action.type) {
    case filterActions.CHANGE_EVENT_FILTER:
      if (action.filter.ticketId) {
        return action.filter.ticketId
      } else return state
    default:
      return state
  }
}

export const filter = (defaultFilter) => {
  return combineReducers({
    ticketId: ticketId(defaultFilter ? defaultFilter.ticketId ? defaultFilter.ticketId : null : null),
    incidentId: incidentId(defaultFilter ? defaultFilter.incidentId ? defaultFilter.incidentId : null : null),
    eventTypes: eventTypes(defaultFilter ? defaultFilter.eventTypes ? defaultFilter.eventTypes : null : null),
    startTime: startTime(defaultFilter ? defaultFilter.startTime ? defaultFilter.startTime : null : null),
    endTime: endTime(defaultFilter ? defaultFilter.endTime ? defaultFilter.endTime : null : null),
    DataSearch: dataSearch(defaultFilter ? defaultFilter.DataSearch ? defaultFilter.DataSearch : null : null)
  })
}

export default filter
