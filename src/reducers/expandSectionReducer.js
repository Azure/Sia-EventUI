var initialState = {
    expandIncidentSummary: true,
    expandIncidentProgress: true,
    expandIncidentEvent: true
}

export default function expandSectionReducer(state = initialState, action) {
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
        default:
            return state
    }
}