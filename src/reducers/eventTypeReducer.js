import * as eventTypeActions from '../actions/eventTypeActions'
import { mergeToStateById } from './reducerHelpers/merge'
import buildFetching from './reducerHelpers/fetching'
import buildError from './reducerHelpers/error'
import { combineReducers } from 'redux'

const defaultEventTypeCollection = {}

const actionSet = {
    try: eventTypeActions.TRY_GET_EVENT_TYPE,
    succeed: eventTypeActions.GET_EVENT_TYPE_SUCCESS,
    fail: eventTypeActions.GET_EVENT_TYPE_FAILURE
}

const fetching = buildFetching(actionSet)

const error = buildError(actionSet)

export const records = (state = defaultEventTypeCollection, action) => {
    switch(action.type){
        case eventTypeActions.GET_EVENT_TYPE_SUCCESS:
            return mergeToStateById(state, action.eventType)
        default:
            return state
    }
}

export const eventTypeReducer = combineReducers({
    fetching,
    error,
    records
})

export default eventTypeReducer
