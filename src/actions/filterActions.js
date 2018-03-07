import deepEquals from 'deep-equal'
import ByPath from 'object-path'

import * as eventActions from 'actions/eventActions'
import * as filterService from 'services/filterService'
import { DateTime } from 'luxon'

export const CHANGE_EVENT_FILTER = 'CHANGE_EVENT_FILTER'

export const changeEventFilter = (history) => (filter) => {
  filterService.getUrlFromFilter(history, filter)
  return {
    type: CHANGE_EVENT_FILTER,
    filter
  }
}

export const changeUncorrelatedEventFilter = (history) => (filter) => {
  filterService.getUrlFromUncorrelatedFilter(history, filter)
  return {
    type: CHANGE_EVENT_FILTER,
    filter
  }
}

export const clearFilterIncidentId = (filter) => {
  return {
    type: CHANGE_EVENT_FILTER,
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
      dispatch(changeEventFilter(history)(newFilter))
      dispatch(eventActions.fetchEvents(newFilter))
    }
  } else {
    const endTime = newFilter.endTime ? DateTime.fromJSDate(new Date(newFilter.endTime)) : DateTime.local()
    const startTime = newFilter.startTime ? DateTime.fromJSDate(new Date(newFilter.startTime)) : DateTime.local().minus({days: 1})
    newFilter = Object.assign(...newFilter, { startTime: startTime.toISO(), endTime: endTime.toISO() })
    dispatch(changeUncorrelatedEventFilter(history)(newFilter))
    dispatch(eventActions.fetchUncorrelatedEvents(newFilter))
  }
}

export const synchronizeFilters = (filter, incidentId, ticketId, history) => {
  const newFilter = Object.assign({}, filter, { incidentId: incidentId, ticketId: ticketId })
  return applyFilter(history)(filter, newFilter)
}
