import moment from 'moment'
import { paginationActions, updatePagination } from './actionHelpers'
import { reduxBackedPromise } from './actionHelpers'
import { authenticatedFetch, authenticatedPost } from '../services/authenticatedFetch'
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
export const ADD_FILTER_ON_EVENT_TYPE = 'ADD_FILTER_ON_EVENT_TYPE'
export const REMOVE_EVENT_FILTER = 'REMOVE_EVENT_FILTER'

export const pagination = paginationActions(EVENTS)
export const linksHeaderName = 'links'

export const eventActions = (siaContext) => ({
    fetchEvent: (incidentId, eventId) => reduxBackedPromise(
        authenticatedFetch(siaContext),
        getEventFetchArgs(incidentId, eventId),
        getEventActionSet(incidentId, eventId)
    ),

    fetchEvents: (filter) => reduxBackedPromise(
        authenticatedFetch(siaContext),
        getEventsFetchArgs(filter),
        getActionSetForEvents(siaContext)(filter.incidentId)
    ),

    postEvent: (incidentId, eventTypeId = 0, data= {}, occurrenceTime = moment()) => reduxBackedPromise(
        authenticatedPost(siaContext),
        postEventFetchArgs(incidentId, eventTypeId, data, occurrenceTime),
        postEventActionSet(incidentId)
    ),
    changeEventFilter: changeEventFilter,
    applyFilter: applyFilter(siaContext),
    addFilter: addFilter(siaContext)
})

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

export const serializeFiltersOld = (filters) =>{
    return filters
    ? Object.entries(filters)        .filter(filter => filter[0] !== 'incidentId')
        .map(filter => `${filter[0]}=${filter[1]}`)
        .join('&')
    : ''
}
    /* filters = {
        incidentId: 0,
        eventTypes: [{id: 0, name: Philip}, ...]
        occurredStart: someDateTime,
        occurredEnd: someDateTime
    }
    */
    // filters.eventTypes = []
    // GOAL URL:
    // incident/123/events?eventTypes=1,2,3&occurredStart=someDateTime&occurredEnd=someDateTime

// THIS ISN'T SET UP TO TAKE AN ARRAY OF EVENTYPES AS A FILTER.  WE MUST CHANGE THAT
export const serializeFilters = (filters) => {
    if (!filters) {
        return ''
    }
    const eventTypes = serializeEventTypes(filters.eventTypes)
    const filterTokens = Object.entries(filters)
                        .filter(filter => filter[0] !== 'incidentId' && filter[0] !== 'eventTypes')
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
    return 'eventTypes=' + eventTypes.map(eventType => eventType.id).join(',')
}


export const getEventActionSet = (incidentId, eventId) => ({
    try: () => ({
        type: REQUEST_EVENT,
        incidentId,
        eventId
    }),

    succeed: (event) => (dispatch) => {
        dispatch({
            type: RECEIVE_EVENT,
            event
        })
        
        dispatch(updatePagination())
    },

    fail: (failureReason) => ({
        type: RECEIVE_EVENT_FAILURE,
        failureReason,
        incidentId,
        eventId
    })
})

export const getActionSetForEvents = (siaContext) => (incidentId) => ({
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
                authenticatedFetch(siaContext),
                [linksHeader.NextPageLink],
                getActionSetForEvents(siaContext)(incidentId)
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

export const applyFilter = (siaContext) => (oldFilter, newFilter) => (dispatch) => {
    if(!newFilter.incidentId){
        throw 'Need to filter on incidentId!'
    }
    if(!deepEquals(oldFilter, newFilter))
    {       
        dispatch(changeEventFilter(newFilter))
        dispatch(eventActions(siaContext).fetchEvents(newFilter))
    }
}

export const changeEventFilter = (filter) => ({
    type: CHANGE_EVENT_FILTER,
    filter
})

export const addFilterOnEventType = (eventTypeInfo) => ({
    type: ADD_FILTER_ON_EVENT_TYPE,
    id: eventTypeInfo.id,
    name: eventTypeInfo.name
})

export const removeEventFilter = (eventTypeInfo) => ({
    type: REMOVE_EVENT_FILTER,
    id: eventTypeInfo.id,
    name: eventTypeInfo.name
})

export const addFilter = (siaContext) => (filter, eventType) => (dispatch) => {
    let oldFilter = filter
    let newFilter = {}

    if (filter.eventTypes.length > 0 && filter.eventTypes.map(eventType => eventType.id).includes(eventType.id)) {
        newFilter = {
            ...filter
        }
    }
    else {
        newFilter = {
            ...filter,
            eventTypes: filter.eventTypes.concat({
                id: eventType.id,
                name: eventType.name
            })
        }
    }
    
    console.log('OLD FILTER', oldFilter)
    console.log('NEWLY ADDED FILTERS', newFilter)
    dispatch(applyFilter(siaContext)(oldFilter, newFilter))
}

export const removeFilter = (sifilter, eventType) => (dispatch) => {
    let oldFilter = filter
    let newFilter
    if (!filter.eventTypes.map(e=> e.id).includes(eventType.id))
    {
        newFilter = filter
    }
    else {
        newFilter = {
            ...filter,
            eventTypes: filter.eventTypes.filter(eventType => eventType.id !== eventType.id)
        }
    }
    // dispatch(applyFilter(siaContext)(oldFilter, newFilter))
}

export default eventActions