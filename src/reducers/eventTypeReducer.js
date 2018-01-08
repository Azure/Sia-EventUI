import { combineReducers } from 'redux'
import * as eventTypeActions from '../actions/eventTypeActions'
import { mergeToStateById } from './reducerHelpers/merge'
import buildFetching from './reducerHelpers/fetching'
import buildError from './reducerHelpers/error'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // default: localStorage if web, AsyncStorage if react-native

const persistConfig = {
    key: 'eventType',
    storage
}

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
        case eventTypeActions.GET_EVENT_TYPES_SUCCESS:
            return mergeToStateById(state, action.eventTypes)
        default:
            return state
    }
}

const persistedRecords = persistReducer({ key: 'eventType', storage }, records)

export const eventTypeReducer = combineReducers({
    fetching,
    error,
    records: persistedRecords
})

export default eventTypeReducer