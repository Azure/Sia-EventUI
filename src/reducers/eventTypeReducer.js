import * as eventTypeActions from '../actions/Playbook/eventTypeActions'
import { mergeToStateById } from './reducerHelpers'
import { combineReducers } from 'redux'

const defaultEventTypeCollection = {}
const defaultFetchingEventTypes = []

export const fetching =  (state = defaultFetchingEventTypes, action) => {
    switch(action.type){
        case eventTypeActions.TRY_GET_EVENT_TYPE:
        case eventTypeActions.TRY_POST_EVENT_TYPE:
            return state.concat([action.eventTypeId])
        case eventTypeActions.POST_EVENT_TYPE_FAILURE:
        case eventTypeActions.POST_EVENT_TYPE_SUCCESS:
        case eventTypeActions.GET_EVENT_TYPE_FAILURE:
        case eventTypeActions.GET_EVENT_TYPE_SUCCESS:
            return state.filter(id => id !== action.eventTypeId)
        default:
            return state
    }
}


export const records = (state = defaultEventTypeCollection, action) => {
    switch(action.type){
        case eventTypeActions.GET_EVENT_TYPE_SUCCESS:
        case eventTypeActions.POST_EVENT_TYPE_SUCCESS:
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