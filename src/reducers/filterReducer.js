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
    case filterActions.UPDATE_START_AND_END_TIME:
      if (action.startTime) {
        return action.startTime
      } else return state
    default:
      return state
  }
}

export const endTime = (defaultEndTime) => (state = defaultEndTime, action) => {
  switch (action.type) {
    case filterActions.UPDATE_START_AND_END_TIME:
      if (action.endTime) {
        return action.endTime
      } else return state
    default:
      return state
  }
}

export const dataSearch = (defaultDataSearch) => (state = defaultDataSearch, action) => {
  switch (action.type) {
    case filterActions.UPDATE_DATASEARCH:
      if (action.dataSearch) {
        return action.dataSearch
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

const initalFilter = {
  ticketId: null,
  incidentId: null,
  eventTypes: null,
  startTime: null,
  endTime: null,
  DataSearch: null
}

export const filter = (defaultFilter = initalFilter) => {
  return combineReducers({
    ticketId: ticketId(defaultFilter.ticketId),
    incidentId: incidentId(defaultFilter.incidentId),
    eventTypes: eventTypes(defaultFilter.eventTypes),
    startTime: startTime(defaultFilter.startTime),
    endTime: endTime(defaultFilter.endTime),
    DataSearch: dataSearch(defaultFilter.DataSearch)
  })
}

export default filter
