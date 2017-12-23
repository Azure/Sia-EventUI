import queryString from 'query-string'
import deepEquals from 'deep-equal'

import * as eventActions from './eventActions'

export const CHANGE_EVENT_FILTER = 'CHANGE_EVENT_FILTER'

/*SHAPE OF FILTERS
filters = {
    incidentId: 0,
    eventTypes: [{id: 0, name: testName}, ...]
    occurredStart: someDateTime,
    occurredEnd: someDateTime
}*/

export const changeEventFilter = (history) => (filter) => {
    getUrlFromFilter(history, filter)
    return {
        type: CHANGE_EVENT_FILTER,
        filter
    }
}

export const addFilter = (history) => (filter, eventType) => (dispatch) => {
    let newFilter = {}
    let oldFilter = filter
    if (!isEventTypeInputValid(eventType)) {
        return
    }
    if (oldFilter && oldFilter.eventTypes && oldFilter.eventTypes.map(eventType => eventType.id).includes(eventType.id)) {
        newFilter = {...oldFilter}
    }
    else {
        newFilter = {
            ...oldFilter,
            eventTypes: oldFilter.eventTypes ?
            oldFilter.eventTypes.concat({
                                    id: eventType.id,
                                    name: eventType.name
                                    })
            : [{ id: eventType.id, name: eventType.name }]
        }
    }
    dispatch(applyFilter(history)(oldFilter, newFilter))
}

const isEventTypeInputValid = (eventType) => {
    return eventType && eventType.id
}

export const removeFilter = (history) => (oldFilter, eventTypeToDelete) => (dispatch) => {
    if (!oldFilter.eventTypes.map(eventType => eventType.id).includes(eventTypeToDelete.id)) {
        return
    }
    const newFilter = {
        ...oldFilter,
        eventTypes: oldFilter.eventTypes.filter(eventType => eventTypeToDelete.id !== eventType.id)
    }
    dispatch(applyFilter(history)(oldFilter, newFilter))
}

export const applyFilter = (history) => (oldFilter, newFilter) => (dispatch) => {
    if (!newFilter.incidentId) {
        throw 'Need to filter on incidentId!'
    }
    if (!deepEquals(oldFilter, newFilter)) {
        dispatch(changeEventFilter(history)(newFilter))
        dispatch(eventActions.fetchEvents(newFilter))
    }
}

export const synchronizeFilters = (filter, incidentId, ticketId, history, dispatch) => {
    const newFilter = Object.assign({ incidentId: incidentId, ticketId: ticketId }, filter)
    dispatch(applyFilter(history)(filter, newFilter))
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
            && filter[0] !== 'validated'
            && filter[0] !== 'ticketId')
        .map(filter => `${filter[0]}=${filter[1]}`)
    const finalFilterTokens = eventTypes
        ? filterTokens.concat(eventTypes)
        : filterTokens
    return finalFilterTokens.join('&')
}

//[{id:, name:}]
export const serializeEventTypesForQuery = (eventTypes) => {
    if (!eventTypes || eventTypes.length === 0) {
        return ''
    }
    return '?' + eventTypes.map(eventType => `eventTypes=${eventType.id}`).join('&')
}

const getFilterEventTypes = (filters) => {
    if (filters.eventTypes) {
        if (Array.isArray(filters.eventTypes) && filters.eventTypes.length > 0) {
            filters.eventTypes = filters.eventTypes.map(eventType => generateFilterObject(eventType))
        }
        else {
            filters.eventTypes = [generateFilterObject(filters.eventTypes)]
        }
    }
    return filters
}

const generateFilterObject = (eventTypeId) => {
    return {id: parseInt(eventTypeId), name: 'unknown'}
}

export const getFilterFromUrl = (urlFilterInfo) => {
    const filterInput = queryString.parse(urlFilterInfo)
    const filter = getFilterEventTypes(filterInput)
    filter.fromUrl = Object.keys(filterInput).length > 0 ? true : false
    filter.validated = filter.fromUrl ? false : true
    return filter
}


export const getUrlFromFilter = (history, filter) => {
    if (filter && filter.eventTypes) {
        history.push(generateUrl(history, filter))
    }
}

const generateUrl = (history, filter) => {
    return /tickets/ + filter.ticketId + serializeEventTypesForQuery(filter.eventTypes)
}

/* per docs OK to have utility functions that return new objects with updated fields
https://redux.js.org/docs/recipes/reducers/RefactoringReducersExample.html */

export const updateFilterEventTypes = (oldFilter, eventTypes) => {
    debugger
    let newFilter = { ...oldFilter }
    if (Object.keys(eventTypes).length > 0 && oldFilter && oldFilter.eventTypes) {
        newFilter = {
            ...oldFilter,
            validated: true,
            eventTypes: getEventTypesFromReferenceData(oldFilter.eventTypes, eventTypes)
        }
    }
    return newFilter
}

const getEventTypesFromReferenceData = (filterEventTypes, referenceData) => {
    return filterEventTypes.map(eventType => findEventTypeInRef(eventType, referenceData))
}
const findEventTypeInRef = (eventType, referenceData) => {
    return referenceData.hasOwnProperty(eventType.id) ? referenceData[eventType.id] : eventType
}