import * as eventTypeActions from '../../actions/Playbook/eventTypeActions'
import { mergeToStateById, byConcatenation, withParentId } from '../reducerHelpers'

const defaultConditionSourceCollection = {}

export const ConditionSourceReducer = (state = defaultConditionSourceCollection, action) => {
    switch(action.type){
        case eventTypeActions.GET_EVENT_TYPE_SUCCESS:
        case eventTypeActions.POST_EVENT_TYPE_SUCCESS:
            return mergeToStateById(
                state,
                withParentId(
                    'conditionId',
                    action.eventType.actions
                        .map(siaAction => siaAction.conditionSets)
                        .reduce(byConcatenation, [])
                        .map(conditionSet => conditionSet.conditions)
                        .reduce(byConcatenation, []),
                    (cond) => cond.conditionSource
                )
            )
        default:
            return state
    }
}

export default ConditionSourceReducer