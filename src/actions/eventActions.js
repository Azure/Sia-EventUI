import { paginationActions, updatePagination } from './actionHelpers'
import { reduxBackedPromise } from './actionHelpers'
import { authenticatedFetch, authenticatedPost } from '../services/authenticatedFetch'

export const EVENTS = 'EVENTS'
export const REQUEST_EVENT = 'REQUEST_EVENT'
export const RECEIVE_EVENT = 'RECEIVE_EVENT'
export const RECEIVE_EVENT_FAILURE = 'RECEIVE_EVENT_FAILURE'
export const REQUEST_EVENTS = 'REQUEST_EVENTS'
export const RECEIVE_EVENTS = 'RECEIVE_EVENTS'
export const RECEIVE_EVENTS_FAILURE = 'RECEIVE_EVENTS_FAILURE'
export const ADD_EVENT = 'ADD_EVENT'

export const pagination = paginationActions(EVENTS)

const makeSearchable = (event) => Object.assign({}, event, {
    filterableIncidentId: event.incidentId.toString()
})

export const getEventActionSet = (incidentId, eventId) => ({
    try: () => ({
        type: REQUEST_EVENT,
        incidentId,
        eventId
    }),

    succeed: (event) => (dispatch) => {
        dispatch({
            type: RECEIVE_EVENT,
            event: makeSearchable(event)
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

export const fetchEvent = (incidentId, eventId) => reduxBackedPromise(
    authenticatedFetch,
    [(incidentId ? 'incidents/' + incidentId + '/': '') + 'events/' + eventId],
    getEventActionSet(incidentId, eventId)
)

export const getEventsActionSet = (incidentId) => ({
    try: () => ({
        type: REQUEST_EVENTS,
        incidentId
    }),

    succeed: (events, response) => (dispatch) => {
        let paginationHeader
        for (let header of response.headers){
            if(header[0] === 'x-pagination'){
                paginationHeader = JSON.parse(header[1])
            }
        }

        dispatch({
            type: RECEIVE_EVENTS,
            events: events.map(event => makeSearchable(event)),
            incidentId,
            pagination: paginationHeader
        })


        if(paginationHeader.NextPageLink){
            dispatch(reduxBackedPromise(
                authenticatedFetch,
                [paginationHeader.NextPageLink],
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

export const fetchEvents = (incidentId) => reduxBackedPromise(
    authenticatedFetch,
    [(incidentId ? 'incidents/' + incidentId + '/': '') + 'events/'],
    getEventsActionSet(incidentId)
)

export const addEvent = (event, incidentId) => ({
    type: ADD_EVENT,
    incidentId,
    event
})
