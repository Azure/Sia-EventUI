export const TOGGLE_COLLAPSE = 'TOGGLE_COLLAPSE'


export const expandIncidentSummary = () => {
    return {
        type: 'EXPAND_INCIDENT_SUMMARY'
    }
}
export const expandIncidentProgress = () => {
    return {
        type: 'EXPAND_INCIDENT_PROGRESS'
    }
}

export const expandIncidentEvent = () => {
    return {
        type: 'EXPAND_INCIDENT_EVENT'
    }
}

export const toggleCollapse = (elementName) => ({
    type: TOGGLE_COLLAPSE,
    elementName
})