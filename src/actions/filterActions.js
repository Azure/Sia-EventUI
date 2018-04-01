import * as filterService from 'services/filterService'
import * as eventActions from 'actions/eventActions'
import * as signalRActions from 'actions/signalRActions'

export const CLEAR_EVENT_FILTER_INCIDENTID = 'CLEAR_EVENT_FILTER_INCIDENTID'
export const UPDATE_EVENT_FILTER_INCIDENTID = 'UPDATE_EVENT_FILTER_INCIDENTID'
export const UPDATE_DATASEARCH = 'UPDATE_DATASEARCH'
export const UPDATE_FILTER_START_TIME = 'UPDATE_FILTER_START_TIME'
export const UPDATE_FILTER_START_DATE = 'UPDATE_FILTER_START_DATE'
export const UPDATE_FILTER_END_TIME = 'UPDATE_FILTER_END_TIME'
export const UPDATE_FILTER_END_DATE = 'UPDATE_FILTER_END_DATE'
export const ADD_EVENT_TYPE_TO_FILTER = 'ADD_EVENT_TYPE_TO_FILTER'
export const REMOVE_EVENT_TYPE_FROM_FILTER = 'REMOVE_EVENT_TYPE_FROM_FILTER'

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

export const addEventTypeToFilter = (eventTypeId) => ({
  type: ADD_EVENT_TYPE_TO_FILTER,
  eventTypeId
})

export const removeEventTypeFromFilter = (eventTypeId) => ({
  type: REMOVE_EVENT_TYPE_FROM_FILTER,
  eventTypeId
})

export const applyEventTypeAddition = (history, oldFilter, signalRFilterType, eventType) => (dispatch) => {
  if (!eventType || (!eventType.id && eventType.id !== 0)) {
    return // Nothing to add
  }
  if (oldFilter && oldFilter.eventTypes && oldFilter.eventTypes.includes(eventType.id)) {
    return // Event Type is already filtered
  }
  dispatch(addEventTypeToFilter(eventType.id))

  const newFilter = Object.assign({}, oldFilter, {eventTypes: oldFilter.eventTypes
    ? oldFilter.eventTypes.concat(eventType.id)
    : [eventType.id]})

  dispatch(applyFilter(history, newFilter, signalRFilterType))
}

export const applyEventTypeRemoval = (history, signalRFilterType, oldFilter, eventTypeId) => (dispatch) => {
  if (!oldFilter.eventTypes || !oldFilter.eventTypes.includes(eventTypeId)) {
    return
  }
  dispatch(removeEventTypeFromFilter(eventTypeId))

  const isFilterToKeep = existingId => eventTypeId !== existingId
  const newFilter = {
    ...oldFilter,
    eventTypes: oldFilter.eventTypes.filter(isFilterToKeep)
  }

  dispatch(applyFilter(history, newFilter, signalRFilterType))
}

export const applyFilter = (history, filter, signalRFilterType) => (dispatch) => {
  filterService.updateUrlToMatchFilter(history, filter)
  dispatch(signalRActions.updateEventFilterPreference(signalRFilterType, filter))
  dispatch(eventActions.clearEvents())
  dispatch(eventActions.fetchEvents(filter))
}
