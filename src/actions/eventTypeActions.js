import { reduxBackedPromise } from './actionHelpers'
import { authenticatedFetch } from '../services/authenticatedFetch'

export const TRY_GET_EVENT_TYPE = 'TRY_GET_EVENT_TYPE'
export const GET_EVENT_TYPE_SUCCESS = 'GET_EVENT_TYPE_SUCCESS'
export const GET_EVENT_TYPE_FAILURE = 'GET_EVENT_TYPE_FAILURE'

export const eventTypeActions = ({
    fetchEventType: (eventTypeId) => reduxBackedPromise(
        authenticatedFetch,
        ['eventTypes/' + eventTypeId],
        getEventTypeActionSet(eventTypeId)
    )
})


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

export default eventTypeActions
