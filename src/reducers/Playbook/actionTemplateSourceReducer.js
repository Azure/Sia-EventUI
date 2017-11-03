import * as eventTypeActions from '../../actions/Playbook/eventTypeActions'
import { mergeToStateById, withParentId } from '../reducerHelpers'

const defaultActionTemplateSourceCollection = {}

export const actionTemplateSourceReducer = (state = defaultActionTemplateSourceCollection, action) => {
    switch(action.type){
        case eventTypeActions.GET_EVENT_TYPE_SUCCESS:
        case eventTypeActions.POST_EVENT_TYPE_SUCCESS:
            return action.eventType && action.eventType.actions
                ? mergeToStateById(
                    state,
                    withParentId(
                        'actionTemplateId',
                        action.eventType.actions.map(siaAction => siaAction.actionTemplate),
                        (at) => at.sources
                    )
                )
                : state
        default:
            return state
    }
}

export default actionTemplateSourceReducer