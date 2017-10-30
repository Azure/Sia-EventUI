import * as eventTypeActions from '../../actions/Playbook/eventTypeActions'
import { mergeToStateById, withParentId, byConcatenatingArrays } from '../reducerHelpers'

const defaultConditionSourceCollection = {}

export const ConditionSourceReducer = (state = defaultConditionSourceCollection, action) => {
    switch(action.type){
        case eventTypeActions.GET_EVENT_TYPE_SUCCESS:
        case eventTypeActions.POST_EVENT_TYPE_SUCCESS:
            return mergeToStateById(
                state,
                action.eventType.actions
                    .map(siaAction => siaAction.conditionSets)
                    .reduce(byConcatenatingArrays, [])
                    .map(conditionSet => conditionSet.conditions)
                    .reduce(byConcatenatingArrays, [])
                    .map(condition => Object.assign({}, condition.conditionSource, {conditionId:condition.id}))
            )
        default:
            return state
    }
}

export default ConditionSourceReducer