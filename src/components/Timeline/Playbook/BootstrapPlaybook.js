import React from 'react'
import { connect } from 'react-redux'
import Playbook from './Playbook'

export class BootstrapPlaybook extends React.Component {
    constructor() {
        super()
    }
    
    componentDidMount() {
        BootstrapIfNeeded(this.props)
    }

    render() {
        return IsBootstrapNeeded(this.props)
            ? <div>Fetching action options...</div>
            : <Playbook
                eventId={this.props.eventId}
                eventTypeId={this.props.eventTypeId}
                ticketId={this.props.ticketId}
                incidentId={this.props.incidentId}
            />
    }
}

export const mapStateToProps = (state, ownProps) => ({
    ...ownProps,
    eventType: state.playbook.eventTypes[ownProps.eventTypeId]
})

export default connect(mapStateToProps)(BootstrapPlaybook)

const IsBootstrapNeeded = (props) => !props.eventType

const BootstrapIfNeeded = (props) => {
    if(IsBootstrapNeeded(props))
    {
        props.dispatch(props.eventTypeActions.fetchEventType(props.eventTypeId))
    }
}

