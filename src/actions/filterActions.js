import queryString from 'query-string'
import deepEquals from 'deep-equal'
import ByPath from 'object-path'

import * as eventActions from 'actions/eventActions'
import moment from 'moment'

export const CHANGE_EVENT_FILTER = 'CHANGE_EVENT_FILTER'

export const changeEventFilter = (history) => (filter) => {
  getUrlFromFilter(history, filter)
  return {
    type: CHANGE_EVENT_FILTER,
    filter
  }
}

export const changeUncorrelatedEventFilter = (history) =>(filter) =>{
  getUrlFromUncorrelatedFilter(history, filter)
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
  /*
  if (!newFilter.incidentId) {
    throw new Error('Need to filter on incidentId!')
  }*/
  console.log('current incidentId is: ' + newFilter.incidentId)
  if (newFilter.incidentId) {
    console.log("applyFilter in normal");
    
    if (!deepEquals(oldFilter, newFilter)) {
      dispatch(changeEventFilter(history)(newFilter))
      dispatch(eventActions.fetchEvents(newFilter))
    }
  }
  else {   
      //console.log('first current startTime is: ' + newFilter.startTime)
      //console.log('first current endTime is: ' + newFilter.endTime)
      const endTime = newFilter.endTime? moment(newFilter.endTime): moment()
      const startTime = newFilter.startTime? moment(newFilter.startTime) : endTime.clone().subtract(1, 'day')
      //console.log('current startTime is: ' + startTime.format())
      //console.log('current endTime is: ' + endTime.format())
      newFilter = Object.assign(...newFilter, {startTime: startTime.format(), endTime: endTime.format() })
      dispatch(changeUncorrelatedEventFilter(history)(newFilter))
      dispatch(eventActions.fetchUncorrelatedEvents(newFilter))
  }
}

export const synchronizeFilters = (filter, incidentId, ticketId, history) => {
  const newFilter = Object.assign({}, filter, { incidentId: incidentId, ticketId: ticketId }) 
  return applyFilter(history)(filter, newFilter)
}



export const serializeFiltersForUrl = (filters) => {
  if (!filters) {
    return ''
  }
  const eventTypes = serializeEventTypesForQuery(filters.eventTypes)
  const filterTokens = Object.entries(filters)
    .filter(filter => filter[0] !== 'incidentId' &&
      filter[0] !== 'eventTypes' &&
      filter[0] !== 'fromUrl' &&
      filter[0] !== 'ticketId')
    .map(filter => `${filter[0]}=${filter[1]}`)
  const finalFilterTokens = eventTypes
    ? filterTokens.concat(eventTypes)
    : filterTokens
  return finalFilterTokens && finalFilterTokens.length > 0 ? '?' + finalFilterTokens.join('&')
    : ''
}

export const serializeEventTypesForQuery = (eventTypes) => {
  if (!eventTypes || eventTypes.length === 0) {
    return ''
  }
  return eventTypes.map(eventType => `eventTypes=${eventType}`).join('&')
}

export const getFilterFromUrl = (urlFilterInfo) => {
  let filter = queryString.parse(urlFilterInfo)
  if (typeof (filter) !== 'object' || !filter.eventTypes) {
    return null
  }
  if (!Array.isArray(filter.eventTypes)) {
    filter.eventTypes = [filter.eventTypes]
  }
  filter.eventTypes = filter.eventTypes.map(e => parseInt(e))
  return filter
}

export const getUrlFromFilter = (history, filter) => {
  if (filter && filter.eventTypes) {
    history.push(generateUrl(history, filter))
  }
}

export const getUrlFromUncorrelatedFilter = (history, filter) => {
  let filterValue
  if(filter){
    if(filter.eventTypes){
      filterValue += serializeEventTypesForQuery(filter.eventTypes)
    }
    const timeFilters = `startTime=${filter.startTime}&endTime=${filter.endTime}`
    filterValue = filter.eventTypes? filterValue + '&' + timeFilters:timeFilters  
    console.log("filter with eventType: " + filterValue)
    history.push('/events/' + '?' + filterValue)
  }  
}


export const generateUrl = (history, filter) => {
  return /tickets/ + filter.ticketId + '?' + serializeEventTypesForQuery(filter.eventTypes)
}

export const findEventTypeInRef = (referenceData) => (eventType) => {
  return referenceData.hasOwnProperty(eventType)
    ? referenceData[eventType]
    : { id: eventType, name: 'unknown' }
}
