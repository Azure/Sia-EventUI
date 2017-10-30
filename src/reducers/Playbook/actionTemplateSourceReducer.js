import * as eventTypeActions from '../../actions/Playbook/eventTypeActions'
import { mergeToStateById, withParentId } from '../reducerHelpers'

const defaultActionTemplateSourceCollection = {}

export const actionTemplateSourceReducer = (state = defaultActionTemplateSourceCollection, action) => {
    switch(action.type){
        case eventTypeActions.GET_EVENT_TYPE_SUCCESS:
        case eventTypeActions.POST_EVENT_TYPE_SUCCESS:
            return mergeToStateById(
                state,
                action.eventType.actions
                    .map(siaAction => siaAction.actionTemplate)
                    .map(actionTemplate => actionTemplate.sources
                                            .map(source => Object.assign({}, source, {actionTemplateId:actionTemplate.id}))
                    ).reduce((aggregateArray, currentSources) => aggregateArray.concat(currentSources), [])
            )
        default:
            return state
    }
}

export default actionTemplateSourceReducer