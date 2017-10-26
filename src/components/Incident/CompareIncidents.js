import { CollapsibleGridSet } from '../elements/CollapsibleGrid'
import { IncidentSummary, IncidentProgress, IncidentEvents, IncidentSummaryName, IncidentProgressName, IncidentEventsName} from './DisplayIncident'

export const CompareIncidents = (engagementActions, firstIncident, firstTicket, firstTicketSystem, secondIncident, secondTicket, secondTicketSystem, expandSection, dispatch) => {
    const ticketIdToIncidentIdMap = [[firstTicket.originId, firstIncident.id], [secondTicket.originId, secondIncident.id]]
    return CollapsibleGridSet('incident-container', 'incident-row', 'incident-col', [
        IncidentSummary(engagementActions, firstIncident, firstTicket, firstTicketSystem, firstTicket.originId, dispatch),
        IncidentSummary(engagementActions, secondIncident, secondTicket, secondTicketSystem, secondTicket.originId, dispatch),
        IncidentProgress(firstTicket.originId, dispatch),
        IncidentProgress(secondTicket.originId, dispatch),
        IncidentEvents(ticketIdToIncidentIdMap, dispatch)
    ],
    [
        IncidentSummaryName(firstTicket.originId),
        IncidentSummaryName(secondTicket.originId),
        IncidentProgressName(firstTicket.originId),
        IncidentProgressName(secondTicket.originId),
        IncidentEventsName()
    ],
    expandSection,
    dispatch)
}

export default CompareIncidents