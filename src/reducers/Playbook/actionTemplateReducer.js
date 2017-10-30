import * as eventTypeActions from '../../actions/Playbook/eventTypeActions'
import { mergeToStateById, withParentId } from '../reducerHelpers'

const defaultActionTemplateCollection = {}

export const actionTemplateReducer = (state = defaultActionTemplateCollection, action) => {
    switch(action.type){
        case eventTypeActions.GET_EVENT_TYPE_SUCCESS:
        case eventTypeActions.POST_EVENT_TYPE_SUCCESS:
            return mergeToStateById(
                state,
                action.eventType.actions.map(siaAction => Object.assign({}, siaAction.actionTemplate, {actionId: siaAction.id}))
            )
        default:
            return state
    }
}

export default actionTemplateReducer