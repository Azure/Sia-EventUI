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

export const pagination = paginationActions(EVENTS)
export const linksHeaderName = 'links'

export const eventActions = (siaContext) => ({
    fetchEvent: (incidentId, eventId) => reduxBackedPromise(
        authenticatedFetch(siaContext),
        [(incidentId ? 'incidents/' + incidentId + '/': '') + 'events/' + eventId],
        getEventActionSet(incidentId, eventId)
    ),

    fetchEvents: (filter) => reduxBackedPromise(
        authenticatedFetch(siaContext),
        [(filter.incidentId ? 'incidents/' + filter.incidentId + '/': '') + 'events/' + serializeFilters(filter)],
        getEventsActionSet(siaContext)(filter.incidentId)
    ),

    postEvent: (incidentId, eventTypeId = 0, data= {}, occurrenceTime = moment()) => reduxBackedPromise(
        authenticatedPost(siaContext),
        [
            (incidentId ? 'incidents/' + incidentId + '/': '') + 'events/',
            {
                eventTypeId,
                occurred: occurrenceTime,
                eventFired: occurrenceTime,
                data
            }
        ],
        postEventActionSet(incidentId)
    )
})

export const serializeFilters = (filters) => filters
    ? Object.entries(filters)
        .filter(filter => filter[0] !== 'incidentId')
        .map(filter => `${filter[0]}=${filter[1]}`)
        .reduce((prev, current) => prev.concat(current, '&'), '')
        .slice(0, -1)
    : ''


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

export const getEventsActionSet = (siaContext) => (incidentId) => ({
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
                getEventsActionSet(siaContext)(incidentId)
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

export const updateEventFilter = (siaContext, oldFilter) => (newFilter) => (dispatch) => {
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

export default eventActions