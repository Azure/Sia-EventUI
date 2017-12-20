import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import DisplayIncident from './DisplayIncident'
import { RetryButton } from '../Buttons'
import * as incidentActions from '../../actions/incidentActions'
import * as eventActions from '../../actions/eventActions'

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
        const { dispatch, incident, ticketId, ticket, ticketSystem, preferences } = this.props
        dispatch(incidentActions.fetchIncidentIfNeeded(incident, ticketId, ticket, ticketSystem, preferences))
    }

    render() {
        const {
            incident,
            ticket,
            ticketSystem,
            dispatch
        } = this.props

        if(incident && incident.error)
        {
            return ErrorLoadingIncident(incident, dispatch)
        }
        if(!incident || incident.IsFetching)
        {
            return CurrentlyLoadingIncident(dispatch)
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
    
    return {
        incident: getIncident(ticket, incidents),
        ticket,
        ticketId,
        ticketSystem: tickets.systems[getTicketSystemId(ticket)],
        preferences: tickets.preferences
    }
}


export const getTicketSystemId = (ticket) => ticket ? (ticket.ticketSystemId ? ticket.ticketSystemId : 1) : 1
export const getIncident = (ticket, incidents) => ticket ? (ticket.incidentId ? incidents.map[ticket.incidentId] : null) : null

export const ErrorLoadingIncident = (incident, dispatch) => {
    return <div>
                <div>Error Loading Incident: {incident.error}</div>
                <RetryButton dispatch={dispatch} actionForRetry={incidentActions.fetchIncident(incident.id)}/>
            </div>
}

export const CurrentlyLoadingIncident = (dispatch) => {
    return <div>
                <div>Loading Incident...</div>
                <RetryButton dispatch={dispatch} actionForRetry={incidentActions.fetchIncidents()}/>
            </div>
}

const connectedTicket = connect(mapStateToProps)(Ticket)
export default connectedTicket