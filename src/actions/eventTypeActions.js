import { reduxBackedPromise } from './actionHelpers'

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

export const fetchEventTypes = () => 
    reduxBackedPromise(['eventTypes/'], getEventTypesActionSet())



export const getEventTypeActionSet = (eventTypeId) => ({
    try: () => ({
        type: TRY_GET_EVENT_TYPE,
        eventTypeId
    }),

    succeed: (eventType) => ({
        type: GET_EVENT_TYPE_SUCCESS,
        eventTypeId,
        eventType
    }),

    fail: (failureReason) => ({
        type: GET_EVENT_TYPE_FAILURE,
        eventTypeId,
        failureReason
    })
})

export const getEventTypesActionSet = () => ({
    try: () => ({
        type: TRY_GET_EVENT_TYPES
    }),

    succeed: (eventTypes) => ({
        type: GET_EVENT_TYPES_SUCCESS,
        eventTypes
    }),

    fail: (failureReason) => ({
        type: GET_EVENT_TYPES_FAILURE,
        failureReason
    })
})