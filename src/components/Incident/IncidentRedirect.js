import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Redirect } from 'react-router'
import incidentActions from '../../actions/incidentActions'
import LoadingMessage from '../elements/LoadingMessage'

class IncidentRedirect  extends Component {
    constructor(props){
        super(props)
    }

    componentDidMount() {
        const { ticketId, incidentId, dispatch } = this.props
        if(!ticketId){
            dispatch(incidentActions.fetchIncident(incidentId))
        }
    }

    render() {
        if(this.props.ticketId){
            return (<Redirect to={`/tickets/${this.props.ticketId}`}/>)
        }
        if(this.props.incidentIsFetching)
        {
            return LoadingMessage('Loading incident information')
        }
        return (<div>Unexpected error or interruption when loading incident</div>)
    }
}

const mapStateToProps = (state, ownProps) => {
    const incidentId = ownProps.match.params.incidentId
    const incident = state.incidents.map[incidentId]
    return {
        incidentId,
        incidentIsFetching: state.incidents.fetchingByIncidentId.includes(incidentId),
        ticketId: (incident && incident.primaryTicket) ? incident.primaryTicket.originId : null
    }
}

export default connect(mapStateToProps)(IncidentRedirect)
