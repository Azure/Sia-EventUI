import { TOGGLE_COLLAPSE } from '../actions/expandSectionActions'


export default function expandSectionReducer(state = {}, action) {
    switch (action.type) {
        case 'EXPAND_INCIDENT_SUMMARY':
            return Object.assign({}, state, {
                expandIncidentSummary: !state.expandIncidentSummary
        })
        case 'EXPAND_INCIDENT_PROGRESS':
            return Object.assign({}, state, {
                expandIncidentProgress: !state.expandIncidentProgress
        })
        case 'EXPAND_INCIDENT_EVENT':
            return Object.assign({}, state, {
                expandIncidentEvent: !state.expandIncidentEvent
        })
        case TOGGLE_COLLAPSE:
            return {
                ...state,
                [action.elementName]: !state[action.elementName]
            }
        default:
            return state
    }
}