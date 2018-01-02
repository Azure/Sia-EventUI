import * as eventTypeActions from '../actions/eventTypeActions'
import { mergeToStateById, buildFetching } from './reducerHelpers'
import { persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // default: localStorage if web, AsyncStorage if react-native

const persistConfig = {
    key: 'eventType',
    storage
}

const defaultEventTypeCollection = {}

export const fetching = buildFetching({
    try: eventTypeActions.TRY_GET_EVENT_TYPE,
    succeed: eventTypeActions.GET_EVENT_TYPE_SUCCESS,
    fail: eventTypeActions.GET_EVENT_TYPE_FAILURE
})

export const records = (state = defaultEventTypeCollection, action) => {
    switch(action.type){
        case eventTypeActions.GET_EVENT_TYPE_SUCCESS:
            return mergeToStateById(state, action.eventType)
        case eventTypeActions.GET_EVENT_TYPES_SUCCESS:
            return mergeToStateById(state, action.eventTypes)
        default:
            return state
    }
}

export const eventTypeReducer = persistCombineReducers(persistConfig, {
    fetching,
    records
})

export default eventTypeReducer
