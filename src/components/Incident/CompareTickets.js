import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import CompareIncidents from 'components/Incident/CompareIncidents'
import { fetchIncidentIfNeeded } from 'actions/incidentActions'
import { ErrorLoadingIncident, CurrentlyLoadingIncident, UnexpectedFailureToLoadIncident, getInfoByTicketId } from 'components/Incident/Ticket'

class CompareTickets extends Component {
  static propTypes = {
    first: PropTypes.object.isRequired,
    second: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    preferences: PropTypes.object.isRequired
  }

  componentDidMount () {
    const {
            first,
            second,
            preferences,
            dispatch
        } = this.props
    dispatch(fetchIncidentIfNeeded(first.incident, first.ticketId, first.ticket, first.ticketSystem, preferences))
    dispatch(fetchIncidentIfNeeded(second.incident, second.ticketId, second.ticket, second.ticketSystem, preferences))
  }

  render () {
    const {
            first,
            second
        } = this.props

    if (first.incidentIsFetching) {
      return CurrentlyLoadingIncident(first.incident, first.ticketId)
    }
    if (second.incidentIsFetching) {
      return CurrentlyLoadingIncident(second.incident, second.ticketId)
    }
    if (!first.incident || !first.ticket || first.incident.error) {
      return ErrorLoadingIncident(first.incident, first.ticketId)
    }
    if (!second.incident || !second.ticket || second.incident.error) {
      return ErrorLoadingIncident(second.incident, second.ticketId)
    }
    if (!first.incident || !first.ticket || first.incident.error) {
      return UnexpectedFailureToLoadIncident()
    }
    if (!second.incident || !second.ticket || second.incident.error) {
      return UnexpectedFailureToLoadIncident()
    }
    if (first.incident.primaryTicket.originId === first.ticket.originId &&
            second.incident.primaryTicket.originId === second.ticket.originId) {
      return <CompareIncidents
        firstIncident={first.incident}
        firstTicket={first.ticket}
        firstTicketSystem={first.ticketSystem}
        secondIncident={second.incident}
        secondTicket={second.ticket}
        secondTicketSystem={second.ticketSystem}
                    />
    }
    return (
      <Redirect to={`/tickets/${first.incident.primaryTicket.originId}/compare/${second.incident.primaryTicket.originId}`}>
        <Route path='/tickets/:firstTicketId/compare/:secondTicketId' component={connectedCompareTickets} />
      </Redirect>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { match } = ownProps
  const firstTicketId = parseInt(match.params.firstTicketId)
  const secondTicketId = parseInt(match.params.secondTicketId)
  return {
    first: getInfoByTicketId(state, firstTicketId),
    second: getInfoByTicketId(state, secondTicketId),
    preferences: state.tickets.preferences
  }
}

const connectedCompareTickets = connect(mapStateToProps)(CompareTickets)
export default connectedCompareTickets
