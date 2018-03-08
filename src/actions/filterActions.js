import deepEquals from 'deep-equal'
import ByPath from 'object-path'

import * as eventActions from 'actions/eventActions'
import * as filterService from 'services/filterService'

export const CHANGE_EVENT_FILTER = 'CHANGE_EVENT_FILTER'
export const CLEAR_EVENT_FILTER_INCIDENTID = 'CLEAR_EVENT_FILTER_INCIDENTID'

export const changeEventFilter = (history, urlLoader) => (filter) => {
  urlLoader(history, filter)
  return {
    type: CHANGE_EVENT_FILTER,
    filter
  }
}

export const clearFilterIncidentId = (filter) => {
  return {
    type: CLEAR_EVENT_FILTER_INCIDENTID,
    filter
  }
}

export const addFilter = (history) => (filter) => (eventType) => {
  let newFilter = {}
  let oldFilter = filter
  if (!eventType || !eventType.id) {
    return
  }
  if (oldFilter && oldFilter.eventTypes && oldFilter.eventTypes.includes(eventType.id)) {
    newFilter = { ...oldFilter }
  } else {
    newFilter = {
      ...oldFilter,
      eventTypes: oldFilter.eventTypes
        ? oldFilter.eventTypes.concat(eventType.id)
        : [eventType.id]
    }
  }
  return applyFilter(history)(oldFilter, newFilter)
}

export const removeFilter = (history, relativeFilterPath) => (oldFilter, filterToDelete) => {
  if (!ByPath.get(oldFilter, relativeFilterPath).includes(filterToDelete)) {
    return
  }
  let newFilter = { ...oldFilter }
  const isFilterToKeep = existingFilter => filterToDelete !== existingFilter
  ByPath.set(newFilter, relativeFilterPath, ByPath.get(oldFilter, relativeFilterPath).filter(isFilterToKeep))
  return applyFilter(history)(oldFilter, newFilter)
}

const applyFilter = (history) => (oldFilter, newFilter) => (dispatch) => {
  if (newFilter.incidentId) {
    if (!deepEquals(oldFilter, newFilter)) {
      dispatch(changeEventFilter(history, filterService.getUrlFromFilter)(newFilter))
      dispatch(eventActions.fetchEvents(newFilter))
    }
  } else {
    dispatch(changeEventFilter(history, filterService.getUrlFromUncorrelatedFilter)(newFilter))
    dispatch(eventActions.fetchUncorrelatedEvents(newFilter))
  }
}

export const synchronizeFilters = (filter, incidentId, ticketId, history) => {
  const newFilter = Object.assign({}, filter, { incidentId: incidentId, ticketId: ticketId })
  return applyFilter(history)(filter, newFilter)
}
