import { connect } from 'react-redux'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router'
import * as incidentActions from '../../actions/incidentActions'
import LoadingMessage from '../elements/LoadingMessage'

export class IncidentRedirect extends Component {
static propTypes = {
    incidentIsFetching: PropTypes.bool,
    ticketId: PropTypes.number,
    incidentId: PropTypes.number,
    dispatch: PropTypes.func
}

    constructor(props){
        super(props)
    }

    componentDidMount() {
        IncidentRedirectComponentDidMount(this.props)
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

export const IncidentRedirectComponentDidMount = (props) => {
    const { ticketId, incidentId, dispatch } = props
    if(!ticketId){
        dispatch(incidentActions.fetchIncident(incidentId))
    }
}

export const mapStateToProps = (state, ownProps) => {
    const incidentId = (ownProps && ownProps.match && ownProps.match.params)
        ? ownProps.match.params.incidentId
        : null
    const incident = (state && state.incidents && state.incidents.map)
        ? state.incidents.map[incidentId]
        : null
    return {
        incidentId,
        incidentIsFetching: (state && state.incidents && state.incidents.fetchingByIncidentId && Array.isArray(state.incidents.fetchingByIncidentId))
            ? state.incidents.fetchingByIncidentId.includes(incidentId)
            : null,
        ticketId: (incident && incident.primaryTicket)
            ? incident.primaryTicket.originId
            : null
    }
}

export default connect(mapStateToProps)(IncidentRedirect)
