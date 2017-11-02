import * as eventTypeActions from '../../actions/Playbook/eventTypeActions'
import { mergeToStateById, withParentId, byConcatenation } from '../reducerHelpers'

const defaultConditionCollection = {}

export const ConditionReducer = (state = defaultConditionCollection, action) => {
    switch(action.type){
        case eventTypeActions.GET_EVENT_TYPE_SUCCESS:
        case eventTypeActions.POST_EVENT_TYPE_SUCCESS:
            return mergeToStateById(
                state,
                withParentId(
                    'conditionSetId',
                    action.eventType.actions
                        .map(siaAction => siaAction.conditionSets)
                        .reduce(byConcatenation, []),
                    (cs) => cs.conditions
                )
            )
        default:
            return state
    }
}

export default ConditionReducer