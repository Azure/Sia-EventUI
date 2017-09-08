import { connect } from 'react-redux'
import React from 'react'
import { Redirect } from 'react-router'

const IncidentRedirect = ({ticketId}) => {
    if(ticketId)
    {
        return (<Redirect to={`/tickets/${ticketId}`}/>)
    }
    return (<div>Incident not yet loaded</div>)
}

const mapStateToProps = (state, ownProps) => {
    return {
        ticketId: state.incidents.map[ownProps.match.params.incidentId].primaryTicket.originId
    }
}

export default connect(mapStateToProps)(IncidentRedirect)