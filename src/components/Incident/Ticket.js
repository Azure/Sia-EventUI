import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import DisplayIncident from './DisplayIncident'
import { RetryButton } from '../elements/Buttons'
import LoadingMessage from '../elements/LoadingMessage'
import * as incidentActions from '../../actions/incidentActions'
import {fetchEventTypes} from '../../actions/eventTypeActions'

class Ticket extends Component {
    static propTypes = {
        incidentId: PropTypes.number,
        incident: PropTypes.object,
        ticket: PropTypes.object,
        ticketId: PropTypes.number,
        ticketSystem: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,
        preferences: PropTypes.object.isRequired
    }

    componentDidMount() {
        const { dispatch, incident, ticketId, ticket, ticketSystem, preferences, history } = this.props
        dispatch(incidentActions.fetchIncidentIfNeeded(incident, ticketId, ticket, ticketSystem, preferences))
        dispatch(fetchEventTypes(history))
    }

    render() {
        const {
            incident,
            ticket,
            ticketId,
            ticketSystem,
            incidentIsFetching,
            dispatch
        } = this.props

        if(incidentIsFetching)
        {
            return CurrentlyLoadingIncident(incident, ticketId)
        }
        if(!incident || !ticket || incident.error)
        {
            return ErrorLoadingIncident(incident, ticketId, dispatch)
        }
        if(incident.primaryTicket.originId === ticket.originId)
        {
            return <DisplayIncident
                incident={incident}
                ticket={ticket}
                ticketSystem={ticketSystem}
             />
        }
        return (
            <Redirect to={`/tickets/${incident.primaryTicket.originId}`}>
                <Route path='/tickets/:ticketId' component={connectedTicket}/>
            </Redirect>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const { incidents, tickets } = state
    const ticketId = parseInt(ownProps.match.params.ticketId)
    const ticket = tickets.map[ticketId]
    const incident = getIncident(ticket, incidents)
    return {
        incident,
        ticket,
        ticketId,
        ticketSystem: tickets.systems[getTicketSystemId(ticket)],
        preferences: tickets.preferences,
        incidentIsFetching: incidents.fetchingByTicketId.includes(ticketId) ||
                            incident && incident.id && incidents.fetchingByIncidentId.includes(incident.id)
    }
}

export const getTicketSystemId = (ticket) => ticket ? (ticket.ticketSystemId ? ticket.ticketSystemId : 1) : 1
export const getIncident = (ticket, incidents) => ticket ? (ticket.incidentId ? incidents.map[ticket.incidentId] : null) : null

export const ErrorLoadingIncident = (incident, ticketId, dispatch) => {
  const actionForRetry = incident && incident.id
                       ? incidentActions.fetchIncident(incident.id)
                       : incidentActions.fetchIncidentsByTicketId(ticketId)
    return <div>
                <div>Error Loading Incident: {incident ? incident.error : 'no incident detected'}</div>

                <RetryButton dispatch={dispatch} actionForRetry={actionForRetry}/>
            </div>
}

export const CurrentlyLoadingIncident = (incident, ticketId) => LoadingMessage(
    'Loading Incident...',
    DetermineRetryAction(incident, ticketId)
)

const DetermineRetryAction = (incident, ticketId) => (incident && incident.id)
    ? incidentActions.fetchIncident(incident.id)
    : ticketId
        ? incidentActions.fetchIncidentsByTicketId(ticketId)
        : incidentActions.fetchIncidents()

const connectedTicket = connect(mapStateToProps)(Ticket)
export default connectedTicket


