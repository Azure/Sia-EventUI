import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import DisplayIncident from './DisplayIncident'
import { RetryButton } from '../Buttons'
import { fetchIncidentIfNeeded } from '../../actions/incidentActions'

class Ticket extends Component {
    static propTypes = {
        incidentId: PropTypes.number,
        incident: PropTypes.object,
        ticket: PropTypes.object,
        ticketId: PropTypes.number,
        ticketSystem: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,
        preferences: PropTypes.object.isRequired,
        incidentActions: PropTypes.object.isRequired,
        engagementActions: PropTypes.object.isRequired
    }

    componentDidMount() {
        this.props.dispatch(fetchIncidentIfNeeded(this.props))
    }

    render() {
        const {
            incident,
            ticket,
            ticketSystem,
            dispatch,
            incidentActions,
            engagementActions
        } = this.props

        if(incident && incident.error)
        {
            return ErrorLoadingIncident(incidentActions, incident)
        }
        if(!incident || incident.IsFetching)
        {
            return CurrentlyLoadingIncident(incidentActions, dispatch)
        }
        if(incident.primaryTicket.originId === ticket.originId)
        {
            return (DisplayIncident(engagementActions, incident, ticket, ticketSystem, dispatch))
        }
        return (
            <Redirect to={`/tickets/${incident.primaryTicket.originId}`}>
                <Route path='/tickets/:ticketId' component={connectedTicket}/>
            </Redirect>
        )
    }
}

const mapStateToProps = (incidentActions, engagementActions) => (state, ownProps) => {
    const { incidents, tickets } = state
    const ticketId = parseInt(ownProps.match.params.ticketId)
    const ticket = tickets.map[ticketId]
    return {
        incident: getIncident(ticket, incidents),
        ticket,
        ticketId,
        ticketSystem: tickets.systems[getTicketSystemId(ticket)],
        preferences: tickets.preferences,
        incidentActions,
        engagementActions
    }
}

export const getTicketSystemId = (ticket) => ticket ? (ticket.ticketSystemId ? ticket.ticketSystemId : 1) : 1
export const getIncident = (ticket, incidents) => ticket ? (ticket.incidentId ? incidents.map[ticket.incidentId] : null) : null

export const ErrorLoadingIncident = (incidentActions, incident, dispatch) => {
    return <div>
                <div>Error Loading Incident: {incident.error}</div>
                <RetryButton dispatch={dispatch} actionForRetry={incidentActions.fetchIncident(incident.id)}/>
            </div>
}

export const CurrentlyLoadingIncident = (incidentActions, dispatch) => {
    return <div>
                <div>Loading Incident...</div>
                <RetryButton dispatch={dispatch} actionForRetry={incidentActions.fetchIncidents()}/>
            </div>
}

const connectedTicket = (incidentActions, engagementActions) => connect(mapStateToProps(incidentActions, engagementActions))(Ticket)

export default connectedTicket