import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Redirect } from 'react-router'

class IncidentRedirect  extends Component {
    constructor(props){
        super(props)
    }

    componentDidMount() {
        const {ticketId, incidentId, dispatch, incidentActions} = this.props
        if(!ticketId){
            dispatch(incidentActions.fetchIncident(incidentId))
        }
    }

    render() {
        if(this.props.ticketId){
            return (<Redirect to={`/tickets/${this.props.ticketId}`}/>)
        }
        return (<div>Incident not yet loaded</div>)
    }
}

const mapStateToProps = (incidentActions) => (state, ownProps) => {
    const incident = state.incidents.map[ownProps.match.params.incidentId]
    return {
        incidentId: ownProps.match.params.incidentId,
        ticketId: (incident ? (incident.primaryTicket ? incident.primaryTicket.originId : null) : null),
        incidentActions
    }
}

export default (incidentActions) => connect(mapStateToProps(incidentActions))(IncidentRedirect)