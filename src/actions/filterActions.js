import queryString from 'query-string'
import deepEquals from 'deep-equal'

import * as eventActions from './eventActions'

export const CHANGE_EVENT_FILTER = 'CHANGE_EVENT_FILTER'

export const changeEventFilter = (history) => (filter) => {
    getUrlFromFilter(history, filter)
    return {
        type: CHANGE_EVENT_FILTER,
        filter
    }
}

export const addFilter = (history) => (filter, eventType) => {
    let newFilter = {}
    let oldFilter = filter
    if (!eventType || !eventType.id) {
        return
    }
    if (oldFilter && oldFilter.eventTypes && oldFilter.eventTypes.includes(eventType.id)) {
        newFilter = {...oldFilter}
    }
    else {
        newFilter = {
            ...oldFilter,
            eventTypes: oldFilter.eventTypes ?
            oldFilter.eventTypes.concat(eventType.id)
            : [eventType.id]
        }
    }
    return applyFilter(history)(oldFilter, newFilter)
}

export const removeFilter = (history) => (oldFilter, eventTypeToDelete) => {
    if (!oldFilter.eventTypes.includes(eventTypeToDelete.id)) {
        return
    }
    const newFilter = {
        ...oldFilter,
        eventTypes: oldFilter.eventTypes.filter(eventType => eventTypeToDelete.id !== eventType)
    }
    return applyFilter(history)(oldFilter, newFilter)
}

export const applyFilter = (history) => (oldFilter, newFilter) => (dispatch) => {
    if (!newFilter.incidentId) {
        throw new Error('Need to filter on incidentId!')
    }
    if (!deepEquals(oldFilter, newFilter)) {
        dispatch(changeEventFilter(history)(newFilter))
        dispatch(eventActions.fetchEvents(newFilter))
    }
}

export const synchronizeFilters = (filter, incidentId, ticketId, history) => {
    const newFilter = Object.assign({ incidentId: incidentId, ticketId: ticketId }, filter)
    return applyFilter(history)(filter, newFilter)
}

export const serializeFiltersForUrl = (filters) => {
    if (!filters) {
        return ''
    }
    const eventTypes = serializeEventTypesForQuery(filters.eventTypes)
    const filterTokens = Object.entries(filters)
        .filter(filter => filter[0] !== 'incidentId'
            && filter[0] !== 'eventTypes'
            && filter[0] !== 'fromUrl'
            && filter[0] !== 'ticketId')
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
    if (typeof(filter) !== 'object' || !filter.eventTypes) {
        return null
    }
    if (!Array.isArray(filter.eventTypes)){
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

export const generateUrl = (history, filter) => {
    return /tickets/ + filter.ticketId + '?' + serializeEventTypesForQuery(filter.eventTypes)
}

export const findEventTypeInRef = (eventType, referenceData) => {
    return referenceData.hasOwnProperty(eventType) ? referenceData[eventType] : {id: eventType, name: 'unknown'}
}