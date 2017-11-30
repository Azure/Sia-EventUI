import * as eventTypeActions from '../actions/eventTypeActions'
import { mergeToStateById, buildFetching } from './reducerHelpers'
import { combineReducers } from 'redux'

const defaultEventTypeCollection = {}
const defaultFetchingEventTypes = []

const eventTypeActionSet = ({
    try: eventTypeActions.TRY_GET_EVENT_TYPE,
    succeed: eventTypeActions.GET_EVENT_TYPE_SUCCESS,
    fail: eventTypeActions.GET_EVENT_TYPE_FAILURE
})

export const fetching = buildFetching(eventTypeActionSet)

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
    records
})

export default eventTypeReducer
