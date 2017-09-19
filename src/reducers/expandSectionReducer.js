var initialState = {
	expandIncidentSummary: true,
	expandIncidentProgress: true,
	expandIncidentEvent: true
}

export default function expandSectionReducer(state = initialState, action) {
	switch (action.type) {
		case 'EXPAND_INCIDENT_SUMMARY':
			return Object.assign({}, state, {
				expandIncidentSummary: !action.expandIncidentSummary
			})
		case 'EXPAND_INCIDENT_PROGRESS':
			return Object.assign({}, state, {
				expandIncidentProgress: !action.expandIncidentProgress
			})
		case 'EXPAND_INCIDENT_EVENT':
			return Object.assign({}, state, {
				expandIncidentEvent: !action.expandIncidentEvent
			})
		default:
			return state
	}
}