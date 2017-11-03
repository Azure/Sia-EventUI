import * as eventTypeActions from '../../actions/Playbook/eventTypeActions'
import { mergeToStateById } from '../reducerHelpers'

const defaultEventTypeCollection = {}

export const eventTypeReducer = (state = defaultEventTypeCollection, action) => {
    switch(action.type){
        case eventTypeActions.GET_EVENT_TYPE_SUCCESS:
        case eventTypeActions.POST_EVENT_TYPE_SUCCESS:
            return mergeToStateById(state, action.eventType)
        default:
            return state
    }
}

export default eventTypeReducer