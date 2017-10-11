import { TOGGLE_COLLAPSE } from '../actions/expandSectionActions'


export default function expandSectionReducer(state = {}, action) {
    switch (action.type) {
        case TOGGLE_COLLAPSE:
            return {
                ...state,
                [action.elementName]: !state[action.elementName]
            }
        default:
            return state
    }
}