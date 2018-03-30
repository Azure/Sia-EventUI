import deepEquals from 'deep-equal'
import ByPath from 'object-path'

import * as filterService from 'services/filterService'

export const CHANGE_EVENT_FILTER = 'CHANGE_EVENT_FILTER'
export const CLEAR_EVENT_FILTER_INCIDENTID = 'CLEAR_EVENT_FILTER_INCIDENTID'
export const UPDATE_EVENT_FILTER_INCIDENTID = 'UPDATE_EVENT_FILTER_INCIDENTID'
export const UPDATE_DATASEARCH = 'UPDATE_DATASEARCH'
export const UPDATE_FILTER_START_TIME = 'UPDATE_FILTER_START_TIME'
export const UPDATE_FILTER_START_DATE = 'UPDATE_FILTER_START_DATE'
export const UPDATE_FILTER_END_TIME = 'UPDATE_FILTER_END_TIME'
export const UPDATE_FILTER_END_DATE = 'UPDATE_FILTER_END_DATE'

export const changeEventFilter = (history, urlLoader = filterService.getUrlFromFilter) => (filter) => {
  urlLoader(history, filter)
  return {
    type: CHANGE_EVENT_FILTER,
    filter
  }
}

export const clearFilterIncidentId = () => ({
  type: CLEAR_EVENT_FILTER_INCIDENTID
})

export const updateEventFilterIncidentId = (incidentId) => ({
  type: UPDATE_EVENT_FILTER_INCIDENTID,
  incidentId
})

export const updateDataSearch = (dataSearch) => ({
  type: UPDATE_DATASEARCH,
  dataSearch
})

export const updateFilterStartTime = (startTime) => ({
  type: UPDATE_FILTER_START_TIME,
  time: startTime
})

export const updateFilterStartDate = (startDate) => ({
  type: UPDATE_FILTER_START_DATE,
  date: startDate
})

export const updateFilterEndTime = (endTime) => ({
  type: UPDATE_FILTER_END_TIME,
  time: endTime
})

export const updateFilterEndDate = (endDate) => ({
  type: UPDATE_FILTER_END_DATE,
  date: endDate
})

export const addFilter = (history) => (filter, signalRFilterType) => (eventType) => {
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
  return applyFilter(history)(oldFilter, newFilter, signalRFilterType)
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

const applyFilter = (history) => (oldFilter, newFilter, signalRFilterType) => (dispatch) => {
  if (newFilter.incidentId) {
    if (!deepEquals(oldFilter, newFilter)) {
      dispatch(signalRActions.updateEventFilterPreference(signalRFilterType, newFilter))
      dispatch(changeEventFilter(history, filterService.getUrlFromFilter)(newFilter))
      dispatch(eventActions.fetchEvents(newFilter))
    }
  } else {
    dispatch(signalRActions.updateEventFilterPreference(signalRFilterType, newFilter))
    dispatch(changeEventFilter(history, filterService.getUrlFromUncorrelatedFilter)(newFilter))
    dispatch(eventActions.fetchUncorrelatedEvents(newFilter))
  }
}

export const synchronizeFilters = (filter, incidentId, ticketId, history) => {
  const newFilter = Object.assign({}, filter, { incidentId: incidentId, ticketId: ticketId })
  return applyFilter(history)(filter, newFilter)
}
