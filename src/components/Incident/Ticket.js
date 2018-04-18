import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import DisplayIncident from 'components/Incident/DisplayIncident'
import LoadingMessage from 'components/elements/LoadingMessage'
import ErrorMessage from 'components/elements/ErrorMessage'
import * as incidentActions from 'actions/incidentActions'
import { fetchEventTypes } from 'actions/eventTypeActions'

class Ticket extends Component {
  static propTypes = {
    incidentId: PropTypes.number,
    incident: PropTypes.object,
    incidentIsFetching: PropTypes.bool,
    incidentIsError: PropTypes.bool,
    ticket: PropTypes.object,
    ticketId: PropTypes.number,
    ticketSystem: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    preferences: PropTypes.object.isRequired
  }

  componentDidMount () {
    const { dispatch, incident, ticketId, ticket, ticketSystem, preferences, incidentIsFetching, incidentIsError } = this.props
    dispatch(incidentActions.fetchIncidentIfNeeded(incident, ticketId, ticket, ticketSystem, preferences, incidentIsFetching, incidentIsError))
    dispatch(fetchEventTypes())
  }

  componentDidUpdate () {
    const { dispatch, incident, ticketId, ticket, ticketSystem, preferences, incidentIsFetching, incidentIsError } = this.props
    dispatch(incidentActions.fetchIncidentIfNeeded(incident, ticketId, ticket, ticketSystem, preferences, incidentIsFetching, incidentIsError))
  }

  render () {
    const {
            incident,
            ticket,
            ticketId,
            ticketSystem,
            incidentIsFetching,
            incidentIsError
        } = this.props

    if (incidentIsFetching) {
      return CurrentlyLoadingIncident(incident, ticketId)
    }

    if (incidentIsError) {
      return ErrorLoadingIncident(incident, ticketId)
    }

    if (!incident && ticket) {
      const currentIncident = { id: ticket.incidentId }

      return <DisplayIncident
        incident={currentIncident}
        ticket={ticket}
        ticketSystem={ticketSystem}
      />
    }

    if (!incident || !incident.primaryTicket || !ticket || incident.error) {
      return UnexpectedFailureToLoadIncident()
    }

    if (incident.primaryTicket.originId && incident.primaryTicket.originId === ticket.originId) {
      return <DisplayIncident
        incident={incident}
        ticket={ticket}
        ticketSystem={ticketSystem}
      />
    }
    return (
      <Redirect to={`/tickets/${incident.primaryTicket.originId}`}>
        <Route path='/tickets/:ticketId' component={connectedTicket} />
      </Redirect>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const ticketId = parseInt(ownProps.match.params.ticketId)
  return {
    ...getInfoByTicketId(state, ticketId),
    preferences: state.tickets.preferences
  }
}

export const getInfoByTicketId = (state, ticketId) => {
  const { incidents, tickets } = state
  const ticket = tickets.map[ticketId]
  const incident = getIncident(ticket, incidents)
  return {
    incident,
    ticket,
    ticketId,
    ticketSystem: tickets.systems[getTicketSystemId(ticket)],
    incidentIsFetching: incidents.fetchingByTicketId.includes(ticketId) ||
            (incident && incident.id && incidents.fetchingByIncidentId.includes(incident.id)),
    incidentIsError: incidents.errorByTicketId.includes(ticketId) ||
            (incident && incident.id && incidents.errorByIncidentId.includes(incident.id))
  }
}

export const getTicketSystemId = (ticket) => ticket ? (ticket.ticketSystemId ? ticket.ticketSystemId : 1) : 1
export const getIncident = (ticket, incidents) => ticket ? (ticket.incidentId ? incidents.map[ticket.incidentId] : null) : null

export const ErrorLoadingIncident = (incident, ticketId) => <ErrorMessage
  message={'Error Loading Incident: ' + (incident ? incident.error : 'incident could not be retrieved')}
  actionForRetry={DetermineRetryAction(incident, ticketId)}
/>

export const CurrentlyLoadingIncident = (incident, ticketId) => <LoadingMessage
  message={'Loading Incident...'}
  actionForRetry={DetermineRetryAction(incident, ticketId)}
/>

export const UnexpectedFailureToLoadIncident = () => ErrorMessage(
    'Unexpected Failure When Attempting to Display Incident'
)

const DetermineRetryAction = (incident, ticketId) => (incident && incident.id)
    ? incidentActions.fetchIncident(incident.id)
    : ticketId
        ? incidentActions.fetchIncidentsByTicketId(ticketId)
        : incidentActions.fetchIncidents()

const connectedTicket = connect(mapStateToProps)(Ticket)
export default connectedTicket
