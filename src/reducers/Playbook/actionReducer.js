import * as eventTypeActions from '../../actions/Playbook/eventTypeActions'
import { mergeToStateById, withParentId } from '../reducerHelpers'

const defaultActionCollection = {}

export const actionReducer = (state = defaultActionCollection, action) => {
    switch(action.type){
        case eventTypeActions.GET_EVENT_TYPE_SUCCESS:
        case eventTypeActions.POST_EVENT_TYPE_SUCCESS:
            return mergeToStateById(
                state,
                withParentId(action.eventType.actions, 'eventTypeId', action.eventType.id)
            )
        default:
            return state
    }
}

export default actionReducer