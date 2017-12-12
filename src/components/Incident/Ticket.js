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
        actions: PropTypes.object.isRequired
    }

    componentDidMount() {
        this.props.dispatch(fetchIncidentIfNeeded(this.props))
        if (this.props.incident && this.props.incident.id)
        {
            synchronizeFilters(this.props.filter, this.props.incident.id, this.props.dispatch, this.props.actions.event)
        }
    }

    componentDidUpdate() {
        if (this.props.incident && this.props.incident.id)
        {
            synchronizeFilters(this.props.filter, this.props.incident.id, this.props.ticketId, this.props.dispatch, this.props.actions.event)
        }
    }

    render() {
        const {
            incident,
            ticket,
            ticketSystem,
            dispatch,
            actions
        } = this.props

        if(incident && incident.error)
        {
            return ErrorLoadingIncident(actions.incident, incident)
        }
        if(!incident || incident.IsFetching)
        {
            return CurrentlyLoadingIncident(actions.incident, dispatch)
        }
        if(incident.primaryTicket.originId === ticket.originId)
        {
            return <DisplayIncident
                eventActions={actions.event}
                engagementActions={actions.engagement}
                eventTypeActions={actions.eventType}
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

const mapStateToProps = (actions) => (state, ownProps) => {
    const { incidents, tickets } = state
    // NOTE:  this ticketId param comes from the URL (we think!)
    const ticketId = parseInt(ownProps.match.params.ticketId)
    const ticket = tickets.map[ticketId]
    const filter = state.events.filter
    return {
        incident: getIncident(ticket, incidents),
        ticket,
        // NOTE:  we can probably delete ticketId since we just use it to get the actual ticket.
        //  NOTE:  Doesn't seem to be used further
        ticketId,
        ticketSystem: tickets.systems[getTicketSystemId(ticket)],
        preferences: tickets.preferences,
        actions,
        filter
    }
}

export const synchronizeFilters = (filter, incidentId, ticketId, dispatch, eventActions) => {
    console.log('SYNCHRONIZE FILTER', filter)
    const newFilter = Object.assign({incidentId: incidentId, ticketId: ticketId}, filter)
    console.log('new filter in ticket', newFilter)
    if (filter.incidentId != incidentId)
    {
        dispatch(eventActions.applyFilter(filter, newFilter))
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

const connectedTicket = (actions) => connect(mapStateToProps(actions))(Ticket)

export default connectedTicket