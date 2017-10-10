import { GridSet } from '../elements/Grid'
import { IncidentSummary, IncidentProgress, IncidentEvents } from './DisplayIncident'

export const CompareIncidents = (firstIncident, firstTicket, firstTicketSystem, secondIncident, secondTicket, secondTicketSystem, dispatch) => {
    const ticketIdToIncidentIdMap = [[firstTicket.originId, firstIncident.id], [secondTicket.originId, secondIncident.id]]
    return GridSet('incident-container', 'incident-row', 'incident-col', [
        IncidentSummary(firstIncident, firstTicket, firstTicketSystem, dispatch),
        IncidentSummary(secondIncident, secondTicket, secondTicketSystem, dispatch),
        IncidentProgress(firstTicket.originId),
        IncidentProgress(secondTicket.originId),
        IncidentEvents(ticketIdToIncidentIdMap, dispatch)
    ])
}

export default CompareIncidents