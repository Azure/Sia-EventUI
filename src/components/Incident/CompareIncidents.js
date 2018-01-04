import { CollapsibleGridSet } from '../elements/CollapsibleGrid'
import { IncidentSummary, IncidentEvents, IncidentSummaryName, IncidentEventsName} from './DisplayIncident'

export const CompareIncidents = (firstIncident, firstTicket, firstTicketSystem, secondIncident, secondTicket, secondTicketSystem, expandSection, dispatch) => {
    const ticketIdToIncidentIdMap = [[firstTicket.originId, firstIncident.id], [secondTicket.originId, secondIncident.id]]
    return CollapsibleGridSet('incident-container', 'incident-row', 'incident-col', [
        IncidentSummary(firstIncident, firstTicket, firstTicketSystem, firstTicket.originId, dispatch),
        IncidentSummary(secondIncident, secondTicket, secondTicketSystem, secondTicket.originId, dispatch),
        IncidentEvents(ticketIdToIncidentIdMap)
    ],
    [
        IncidentSummaryName(firstTicket.originId),
        IncidentSummaryName(secondTicket.originId),
        IncidentEventsName()
    ],
    expandSection,
    dispatch)
}

export default CompareIncidents