export const expandIncidentSummary = status => {
	return {
	    type: 'EXPAND_INCIDENT_SUMMARY',
		status
	}
}

export const expandIncdientProgress = status => {
	return {
		type: 'EXPAND_INCIDENT_PROGRESS',
		status
	}
}

export const expandIncidentEvent = status => {
	return {
		type: 'EXPAND_INCIDENT_EVENT',
		status
	}
}

/*
export function expandIncidentEvent(status) {
	return {
		type: 'EXPAND_INCIDENT_EVENT',
		expandIncidentEvent: status
	}
}
*/