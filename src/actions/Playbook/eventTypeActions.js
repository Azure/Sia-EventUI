import { reduxBackedPromise } from '../actionHelpers'
import { authenticatedFetch, authenticatedPost } from '../../services/authenticatedFetch'

export const TRY_GET_EVENT_TYPE = 'TRY_GET_EVENT_TYPE'
export const GET_EVENT_TYPE_SUCCESS = 'GET_EVENT_TYPE_SUCCESS'
export const GET_EVENT_TYPE_FAILURE = 'GET_EVENT_TYPE_FAILURE'
export const TRY_POST_EVENT_TYPE = 'TRY_POST_EVENT_TYPE'
export const POST_EVENT_TYPE_SUCCESS = 'POST_EVENT_TYPE_SUCCESS'
export const POST_EVENT_TYPE_FAILURE = 'POST_EVENT_TYPE_FAILURE'

export const eventTypeActions = (siaContext) => ({
    fetchEventType: (eventTypeId) => reduxBackedPromise(
        authenticatedFetch(siaContext),
        ['eventTypes/' + eventTypeId],
        getEventTypeActionSet(eventTypeId)
    ),

    postEventType: (name, data) => reduxBackedPromise(
        authenticatedPost(siaContext),
        [
            'eventTypes/',
            {
                name,
                data
            }
        ],
        postEventTypeActionSet(name, data)
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

export const postEventTypeActionSet = (name, data) => ({
    try: () => ({
        type: TRY_POST_EVENT_TYPE,
        name,
        data
    }),

    succeed: (eventType) => ({
        type: POST_EVENT_TYPE_SUCCESS,
        name,
        eventType
    }),

    fail: (failureReason) => ({
        type: POST_EVENT_TYPE_FAILURE,
        name,
        data,
        failureReason
    })
})

export default eventTypeActions