import moment from 'moment'
import { paginationActions, updatePagination } from './actionHelpers'
import { reduxBackedPromise } from './actionHelpers'
import deepEquals from 'deep-equal'

export const EVENTS = 'EVENTS'
export const REQUEST_EVENT = 'REQUEST_EVENT'
export const RECEIVE_EVENT = 'RECEIVE_EVENT'
export const RECEIVE_EVENT_FAILURE = 'RECEIVE_EVENT_FAILURE'
export const REQUEST_EVENTS = 'REQUEST_EVENTS'
export const RECEIVE_EVENTS = 'RECEIVE_EVENTS'
export const RECEIVE_EVENTS_FAILURE = 'RECEIVE_EVENTS_FAILURE'
export const POST_EVENT_TRY = 'POST_EVENT_TRY'
export const POST_EVENT_SUCCEED = 'POST_EVENT_SUCCEED'
export const POST_EVENT_FAIL = 'POST_EVENT_FAIL'
export const ADD_EVENT = 'ADD_EVENT'
export const CHANGE_EVENT_FILTER = 'CHANGE_EVENT_FILTER'
export const UPDATE_EVENTS_AFTER_FILTER_CHANGE = 'UPDATE_EVENTS_AFTER_FILTER_CHANGE'
export const UPDATE_URL = 'UPDATE_URL'

export const pagination = paginationActions(EVENTS)
export const linksHeaderName = 'links'


export const fetchEvent = (incidentId, eventId) => reduxBackedPromise(
    [getEventsEndPoint(incidentId) + eventId],
    getEventActionSet(incidentId, eventId)
)

export const fetchEvents = (filter) => reduxBackedPromise(
        getEventsFetchArgs(filter),
        getEventsActionSet(filter.incidentId)
    )

export const postEvent = (incidentId, eventTypeId = 0, data= {}, occurrenceTime = moment()) => reduxBackedPromise(
    postEventFetchArgs(incidentId, eventTypeId, data, occurrenceTime),
    postEventActionSet(incidentId),
    'POST'
)

export const getEventsEndPoint = (incidentId) => (incidentId ? 'incidents/' + incidentId + '/': '') + 'events/'

export const getEventsFetchArgs = (filter) => ([
   getEventsEndPoint(filter.incidentId) + serializeFilters(filter)
])

export const getEventFetchArgs = (incidentId, eventId) => {
    return [getEventsEndPoint(incidentId) + eventId]
}

export const postEventFetchArgs = (incidentId, eventTypeId, data, occurrenceTime) => ([
    getEventsEndPoint(incidentId),
    {
        eventTypeId,
        occurred: occurrenceTime,
        eventFired: occurrenceTime,
        data
    }
])

    /*
    SHAPE OF FILTERS
    filters = {
        incidentId: 0,
        eventTypes: [{id: 0, name: testName}, ...]
        occurredStart: someDateTime,
        occurredEnd: someDateTime
    }
   
    filters.eventTypes = []

    URL PATTERNS
    Gateway & UI URL:
    /tickets/38805418?eventTypes=1&eventTypes=2&eventTypes=3&occurredStart=someDateTime&occurredEnd=someDateTime
     */


export const serializeFilters = (filters) => {
    if (!filters) {
        return ''
    }
    const eventTypes = serializeEventTypes(filters.eventTypes)
    const filterTokens = Object.entries(filters)
                        .filter(filter => filter[0] !== 'incidentId' && filter[0] !== 'eventTypes' && filter[0] !== 'filterSearchField' && filter[0] !== 'ticketId')
                        .map(filter => `${filter[0]}=${filter[1]}`)
    const finalFilterTokens = eventTypes
        ? filterTokens.concat(eventTypes)
        : filterTokens
    return finalFilterTokens.join('&')

}
//[{id:, name:}]
export const serializeEventTypes = (eventTypes) => {
    if (!eventTypes || eventTypes.length === 0) {
        return ''
    }
    return '?' + eventTypes.map(eventType => `eventTypes=${eventType.id}`).join('&')
}

export const getEventActionSet = (incidentId, eventId) => ({
    try: () => ({
        type: REQUEST_EVENT,
        incidentId,
        id: eventId
    }),

    succeed: (event) => (dispatch) => {
        dispatch({
            type: RECEIVE_EVENT,
            event,
            id: eventId
        })
        
        dispatch(updatePagination())
    },

    fail: (failureReason) => ({
        type: RECEIVE_EVENT_FAILURE,
        failureReason,
        incidentId,
        id: eventId
    })
})

export const getEventsActionSet = (incidentId) => ({
    try: () => ({
        type: REQUEST_EVENTS,
        incidentId
    }),

    succeed: (events, response) => (dispatch) => {
        let linksHeader
        for (let header of response.headers){
            if(header[0] === linksHeaderName){
                linksHeader = JSON.parse(header[1])
            }
        }

        dispatch({
            type: RECEIVE_EVENTS,
            events,
            incidentId,
            pagination: linksHeader
        })


        if(linksHeader.NextPageLink){
            dispatch(reduxBackedPromise(
                [linksHeader.NextPageLink],
                getEventsActionSet(incidentId)
            ))
        }
        else{
            dispatch(updatePagination())
        }
    },

    fail: (failureReason) => ({
        type: RECEIVE_EVENTS_FAILURE,
        failureReason,
        incidentId
    })
})

export const addEvent = (event, incidentId) => ({
    type: ADD_EVENT,
    incidentId,
    event
})

export const postEventActionSet = (incidentId) => ({
    try: () => ({
        type: POST_EVENT_TRY,
        incidentId
    }),

    succeed: (event) => dispatch => {
        dispatch({
            type: POST_EVENT_SUCCEED,
            incidentId,
            event
        })

        dispatch(updatePagination())
    },

    fail: (failureReason) => ({
        type: POST_EVENT_FAIL,
        incidentId,
        failureReason
    })
})

export const applyFilter = (history) => (oldFilter, newFilter) => (dispatch) => {
    if(!newFilter.incidentId){
        throw 'Need to filter on incidentId!'
    }
    if(!deepEquals(oldFilter, newFilter))
    {
        dispatch(changeEventFilter(history)(newFilter))
        dispatch(fetchEvents(newFilter))
    }
}

export const changeEventFilter = (history) => (filter) => {
    getUrlFromFilters(history, filter)
    return {
        type: CHANGE_EVENT_FILTER,
        filter
    }
}

export const getUrlFromFilters = (history, filters) => {
    if (filters && filters.eventTypes ) {
        history.push(generateUrl(history, filters))
    }
}

export const generateUrl = (history, filters) => {
    return /tickets/ + filters.ticketId + serializeEventTypesForUrl(filters.eventTypes)
}

const serializeEventTypesForUrl = (eventTypes) => {
    if (!eventTypes || eventTypes.length === 0) {
        return ''
    }
    return '/?' + eventTypes.map(eventType => `eventTypes=${eventType.id}`).join('&')
}

export const isEventTypeInputValid = (eventType) => {
    return eventType && eventType.id
}

export const addFilter = (history) => (filter, eventType) => (dispatch) => {
    let newFilter = {}
    let oldFilter = filter
    if (!isEventTypeInputValid(eventType)) {
        return
    }

    if (oldFilter && oldFilter.eventTypes && oldFilter.eventTypes.map(eventType => eventType.id).includes(eventType.id)) {
        newFilter = {
            ...oldFilter
        }
    }
    else {
        newFilter = {
            ...oldFilter,
            eventTypes: oldFilter.eventTypes ? oldFilter.eventTypes.concat({
                id: eventType.id,
                name: eventType.name
            }) : [{id: eventType.id, name: eventType.name}]
        }
    }

    dispatch(applyFilter(history)(oldFilter, newFilter))
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

