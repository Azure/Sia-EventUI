import * as eventTypeActions from '../../actions/Playbook/eventTypeActions'
import { mergeToStateById, withParentId, byConcatenatingArrays } from '../reducerHelpers'

const defaultConditionSetCollection = {}

export const ConditionSetReducer = (state = defaultConditionSetCollection, action) => {
    switch(action.type){
        case eventTypeActions.GET_EVENT_TYPE_SUCCESS:
        case eventTypeActions.POST_EVENT_TYPE_SUCCESS:
            return mergeToStateById(
                state,
                action.eventType.actions
                    .map(siaAction => siaAction.conditionSets
                        .map(conditionSet => Object.assign({}, conditionSet, {actionId:siaAction.id}))
                    ).reduce(byConcatenatingArrays, [])
            )
        default:
            return state
    }
}

export default ConditionSetReducer