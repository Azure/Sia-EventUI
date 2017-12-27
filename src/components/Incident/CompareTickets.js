import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import CompareIncidents from './CompareIncidents'
import { fetchIncidentIfNeeded } from '../../actions/incidentActions'
import { ErrorLoadingIncident, CurrentlyLoadingIncident, getInfoByTicketId } from './Ticket'

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
        this.props.dispatch(fetchIncidentIfNeeded(this.props))
        this.props.dispatch(fetchIncidentIfNeeded(this.props))
    }

    render() {
        const {
            first,
            second,
            dispatch
        } = this.props
        const {
            firstIncident,
            firstIncidentIsFetching,
            firstTicket,
            firstTicketId,
            firstTicketSystem
        } = first
        const {
            secondIncident,
            secondIncidentIsFetching,
            secondTicket,
            secondTicketId,
            secondTicketSystem
        } = second

        if(firstIncidentIsFetching)
        {
            return CurrentlyLoadingIncident(firstIncident, firstTicketId)
        }
        if(secondIncidentIsFetching)
        {
            return CurrentlyLoadingIncident(secondIncident, secondTicketId)
        }
        if(!firstIncident || !firstTicket || firstIncident.error)
        {
            return ErrorLoadingIncident(firstIncident)
        }
        if(!secondIncident || !secondTicket || secondIncident.error)
        {
            return ErrorLoadingIncident(secondIncident)
        }
        if(firstIncident.primaryTicket.originId === firstTicket.originId && secondIncident.primaryTicket.originId === secondTicket.originId)
        {
            return <CompareIncidents
                        firstIncident={firstIncident}
                        firstTicket={firstTicket}
                        firstTicketSystem={firstTicketSystem}
                        secondIncident={secondIncident}
                        secondTicket={secondTicket}
                        secondTicketSystem={secondTicketSystem}
                    />
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
    const firstIncident = getIncident(firstTicket, incidents)
    const secondIncident = getIncident(secondTicket, incidents)
    return {
        first: getInfoByTicketId(firstTicketId),
        second: getInfoByTicketId(secondTicketId),
        preferences: state.tickets.preferences
    }
}

const connectedCompareTickets = connect(mapStateToProps)(CompareTickets)
export default connectedCompareTickets