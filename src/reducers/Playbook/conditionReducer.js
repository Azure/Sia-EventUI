import * as eventTypeActions from '../../actions/Playbook/eventTypeActions'
import { mergeToStateById, withParentId, byConcatenatingArrays } from '../reducerHelpers'

const defaultConditionCollection = {}

export const ConditionReducer = (state = defaultConditionCollection, action) => {
    switch(action.type){
        case eventTypeActions.GET_EVENT_TYPE_SUCCESS:
        case eventTypeActions.POST_EVENT_TYPE_SUCCESS:
            return mergeToStateById(
                state,
                action.eventType.actions
                    .map(siaAction => siaAction.conditionSets)
                    .reduce(byConcatenatingArrays, [])
                    .map(conditionSet => withParentId(conditionSet.conditions.reduce(byConcatenatingArrays, []), 'conditionSetId', conditionSet.id))
                    .reduce(byConcatenatingArrays, [])
            )
        default:
            return state
    }
}

export default ConditionReducer