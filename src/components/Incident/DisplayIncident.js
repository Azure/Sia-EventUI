import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { GridSet } from 'components/elements/Grid'
import { IncidentSummary } from 'components/Incident/IncidentSummary'
import { IncidentEvents } from 'components/Incident/IncidentEvents'

export const DisplayIncident = ({incident, ticket, ticketSystem, dispatch}) => {
  return GridSet('incident-container', 'incident-row', 'incident-col', [
    IncidentSummary({incident, ticket, ticketSystem, ticketOriginId: ticket.originId, dispatch}),
    IncidentEvents([[ticket.originId, incident.id]])
  ])
}

DisplayIncident.propTypes = {
  incident: PropTypes.object,
  ticket: PropTypes.object,
  ticketSystem: PropTypes.object,
  dispatch: PropTypes.func.isRequired
}

export const mapStateToProps = (state, ownProps) => ({
  ...ownProps
})

export default connect(mapStateToProps)(DisplayIncident)
