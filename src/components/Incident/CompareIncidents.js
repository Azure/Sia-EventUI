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
        expandSection[IncidentSummaryName(firstTicket.originId)],
        expandSection[IncidentSummaryName(secondTicket.originId)],
        expandSection[IncidentProgressName(firstTicket.originId)],
        expandSection[IncidentProgressName(secondTicket.originId)],
        expandSection[IncidentEventsName()]
    ])
}

export default CompareIncidents