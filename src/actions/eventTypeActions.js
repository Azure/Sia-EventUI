import { reduxBackedPromise } from './actionHelpers'
import * as eventActions from './eventActions'
import {store} from '../index.js'
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

export const fetchEventTypes = (history) =>
    reduxBackedPromise(['eventTypes/'], getEventTypesActionSet(history))



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
        if (Object.keys(eventTypes).length > 0 && oldFilter && oldFilter.eventTypes) {
            const newFilter = {
                ...oldFilter,
                validated: true,
                eventTypes: getEventTypesFromReferenceData(oldFilter.eventTypes, eventTypes)
            }
            dispatch(eventActions.applyFilter(history)(oldFilter, newFilter))
        }
    },

    fail: (failureReason) => ({
        type: GET_EVENT_TYPES_FAILURE,
        failureReason
    })
})

const getEventTypesFromReferenceData = (filterEventTypes, referenceData) => {
    return filterEventTypes.map(eventType => findEventTypeInRef(eventType, referenceData))
}
const findEventTypeInRef = (eventType, referenceData) => {
    return referenceData.hasOwnProperty(eventType.id) ? referenceData[eventType.id] : eventType
}