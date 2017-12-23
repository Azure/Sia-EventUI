import { reduxBackedPromise } from './actionHelpers'
import * as eventActions from './eventActions'
import {store} from '../index.js'
import * as filterActions from './filterActions'

export const TRY_GET_EVENT_TYPE = 'TRY_GET_EVENT_TYPE'
export const GET_EVENT_TYPE_SUCCESS = 'GET_EVENT_TYPE_SUCCESS'
export const GET_EVENT_TYPE_FAILURE = 'GET_EVENT_TYPE_FAILURE'

export const TRY_GET_EVENT_TYPES = 'TRY_GET_EVENT_TYPES'
export const GET_EVENT_TYPES_SUCCESS = 'GET_EVENT_TYPES_SUCCESS'
export const GET_EVENT_TYPES_FAILURE = 'GET_EVENT_TYPES_FAILURE'

export const fetchEventType = (eventTypeId) => reduxBackedPromise(
    ['eventTypes/' + eventTypeId],
    getEventTypeActionSet(eventTypeId)
)

export const fetchEventTypes = (history) => reduxBackedPromise(
    ['eventTypes/'], getEventTypesActionSet(history)
)

export const getEventTypeActionSet = (eventTypeId) => ({
    try: () => ({
        type: TRY_GET_EVENT_TYPE,
        id: eventTypeId
    }),

    succeed: (eventType) => ({
        type: GET_EVENT_TYPE_SUCCESS,
        id: eventTypeId,
        eventType
    }),

    fail: (failureReason) => ({
        type: GET_EVENT_TYPE_FAILURE,
        id: eventTypeId,
        failureReason
    })
})

export const getEventTypesActionSet = (history) => ({
    try: () => ({
        type: TRY_GET_EVENT_TYPES
    }),

    succeed: (eventTypes) => (dispatch) => {
        const oldFilter = store.getState().events.filter
        dispatch({
            type: GET_EVENT_TYPES_SUCCESS,
            eventTypes
        })
        debugger
        const newFilter = filterActions.updateFilterEventTypes(oldFilter, eventTypes)
        debugger
        dispatch(filterActions.applyFilter(history)(oldFilter, newFilter))        
    },

    fail: (failureReason) => ({
        type: GET_EVENT_TYPES_FAILURE,
        failureReason
    })
})


