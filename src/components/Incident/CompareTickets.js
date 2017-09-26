import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import CompareIncidents from './CompareIncidents'
import * as incidentActions from '../../actions/incidentActions'
import { ErrorLoadingIncident, CurrentlyLoadingIncident, getTicketSystemId, getIncident } from './Ticket'

class CompareTickets extends Component {
    static propTypes = {
        firstIncident: PropTypes.object,
        firstTicket: PropTypes.object,
        firstTicketSystem: PropTypes.object.isRequired,
        secondIncident: PropTypes.object,
        secondTicket: PropTypes.object,
        secondTicketSystem: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,
        preferences: PropTypes.object.isRequired
    }

    componentDidMount() {
        this.props.dispatch(incidentActions.fetchIncidentIfNeeded({
            incident: this.props.firstIncident,
            ticket: this.props.firstTicket,
            ticketId: this.props.firstTicketId,
            ticketSystem: this.props.firstTicketSystem,
            preferences: this.props.preferences
        }))
        this.props.dispatch(incidentActions.fetchIncidentIfNeeded({
            incident: this.props.secondIncident,
            ticket: this.props.secondTicket,
            ticketId: this.props.secondTicketId,
            ticketSystem: this.props.secondTicketSystem,
            preferences: this.props.preferences
        }))
    }

    render() {
        const { firstIncident, firstTicket, firstTicketSystem, secondIncident, secondTicket, secondTicketSystem, expandSection, dispatch } = this.props

        if(firstIncident && firstIncident.error)
        {
            return ErrorLoadingIncident(firstIncident)
        }
        if(secondIncident && secondIncident.error)
        {
            return ErrorLoadingIncident(secondIncident)
        }
        if(!firstIncident || firstIncident.IsFetching || !secondIncident || secondIncident.IsFetching)
        {
            return CurrentlyLoadingIncident()
        }
        if(firstIncident.primaryTicket.originId === firstTicket.originId && secondIncident.primaryTicket.originId === secondTicket.originId)
        {
            return (CompareIncidents(firstIncident, firstTicket, firstTicketSystem, secondIncident, secondTicket, secondTicketSystem, expandSection, dispatch))
        }
        return (
            <Redirect to={`/tickets/${firstIncident.primaryTicket.originId}/compare/${secondIncident.primaryTicket.originId}`}>
                <Route path='/tickets/:firstTicketId/compare/:secondTicketId' component={connectedCompareTickets}/>
            </Redirect>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const { incidents, tickets, expandSection } = state
    const { match } = ownProps
    const firstTicketId = parseInt(match.params.firstTicketId)
    const firstTicket = tickets.map[firstTicketId]
    const secondTicketId = parseInt(match.params.secondTicketId)
    const secondTicket = tickets.map[secondTicketId]
    return {
        firstIncident: getIncident(firstTicket, incidents),
        firstTicket,
        firstTicketId,
        firstTicketSystem: tickets.systems[getTicketSystemId(firstTicket)],
        secondIncident: getIncident(secondTicket, incidents),
        secondTicket,
        secondTicketId,
        secondTicketSystem: tickets.systems[getTicketSystemId(secondTicket)],
        preferences: tickets.preferences,
        expandSection
    }
}


const connectedCompareTickets = connect(mapStateToProps)(CompareTickets)

export default connectedCompareTickets