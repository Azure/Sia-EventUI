import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import CompareIncidents from './CompareIncidents'
import { fetchIncidentIfNeeded } from '../../actions/incidentActions'
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
        preferences: PropTypes.object.isRequired,
        incidentActions: PropTypes.object.isRequired,
        engagementActions: PropTypes.object.isRequired
    }

    componentDidMount() {
        this.props.dispatch(fetchIncidentIfNeeded(this.props))
        this.props.dispatch(fetchIncidentIfNeeded(this.props))
    }

    render() {
        const {
            firstIncident,
            firstTicket,
            firstTicketSystem,
            secondIncident,
            secondTicket,
            secondTicketSystem,
            dispatch,
            incidentActions,
            engagementActions,
            expandSection
        } = this.props

        if(firstIncident && firstIncident.error)
        {
            return ErrorLoadingIncident(incidentActions, firstIncident)
        }
        if(secondIncident && secondIncident.error)
        {
            return ErrorLoadingIncident(incidentActions, secondIncident)
        }
        if(!firstIncident
            || firstIncident.IsFetching
            || !secondIncident
            || secondIncident.IsFetching){
            return CurrentlyLoadingIncident(incidentActions, dispatch)
        }
        if(firstIncident.primaryTicket.originId === firstTicket.originId && secondIncident.primaryTicket.originId === secondTicket.originId)
        {
            return (CompareIncidents(engagementActions, firstIncident, firstTicket, firstTicketSystem, secondIncident, secondTicket, secondTicketSystem, expandSection, dispatch))
        }
        return (
            <Redirect to={`/tickets/${firstIncident.primaryTicket.originId}/compare/${secondIncident.primaryTicket.originId}`}>
                <Route path='/tickets/:firstTicketId/compare/:secondTicketId' component={connectedCompareTickets}/>
            </Redirect>
        )
    }
}

const mapStateToProps = (incidentActions, engagementActions) => (state, ownProps) => {
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
        expandSection,
        incidentActions,
        engagementActions
    }
}


const connectedCompareTickets = (incidentActions, engagementActions) => connect(mapStateToProps(incidentActions, engagementActions))(CompareTickets)

export default connectedCompareTickets