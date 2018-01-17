import { connect } from 'react-redux'

import PropTypes from 'prop-types'
import { CollapsibleGridSet } from 'components/elements/CollapsibleGrid'
import { mapStateToProps } from 'components/Incident/DisplayIncident'
import { IncidentSummary, IncidentSummaryName } from 'components/Incident/IncidentSummary'
import { IncidentEvents, IncidentEventsName } from 'components/Incident/IncidentEvents'

export const CompareIncidents = ({firstIncident, firstTicket, firstTicketSystem, secondIncident, secondTicket, secondTicketSystem, expandSection, dispatch}) => {
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

CompareIncidents.propTypes = {
  firstIncident: PropTypes.object,
  firstTicket: PropTypes.object,
  firstTicketSystem: PropTypes.object.isRequired,
  secondIncident: PropTypes.object,
  secondTicket: PropTypes.object,
  secondTicketSystem: PropTypes.object.isRequired,
  expandSection: PropTypes.object,
  dispatch: PropTypes.func.isRequired
}

export default connect(mapStateToProps)(CompareIncidents)
