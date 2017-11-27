import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Redirect } from 'react-router'
import incidentActions from '../../actions/incidentActions'

class IncidentRedirect  extends Component {
    constructor(props){
        super(props)
    }

    componentDidMount() {
        const {ticketId, incidentId, dispatch} = this.props
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

const mapStateToProps = (state, ownProps) => {
    const incident = state.incidents.map[ownProps.match.params.incidentId]
    return {
        incidentId: ownProps.match.params.incidentId,
        ticketId: (incident ? (incident.primaryTicket ? incident.primaryTicket.originId : null) : null)
    }
}

export default connect(mapStateToProps)(IncidentRedirect)