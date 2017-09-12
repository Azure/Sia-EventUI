import paginated from 'paginated-redux'
import * as eventActions from '../actions/eventActions'
import { mergeWithOverwrite } from './reducerHelpers'

const defaultEventCollection = []

const addEventsToState = (state, Events) => {
    return mergeWithOverwrite(state, Events)
}

export const list = (state = defaultEventCollection, action) => {
    switch(action.type){
        case eventActions.RECEIVE_EVENT:
            return addEventsToState(state, action.event)
        case eventActions.RECEIVE_EVENTS:
            return addEventsToState(state, action.events)
        default:
            return state
    }
}

export const events = paginated(list, eventActions.pagination.types)

export default events