import * as globalActionActions from '../actions/globalActionActions'
import { mergeToStateById } from './reducerHelpers'

const defaultGlobalActionCollection = {}

export const records = (state = defaultGlobalActionCollection, action) => {
    switch(action.type){
        case globalActionActions.GET_GLOBAL_ACTIONS_SUCCESS:
            return mergeToStateById(state, action.globalActions)
        default:
            return state
    }
}

export default records