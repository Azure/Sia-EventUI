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

    componentDidUpdate() {
        BootstrapIfNeeded(this.props)
    }

    render() {
        return <div></div>
    }
}

export const mapStateToProps = (state, ownProps) => ({
    ...ownProps,
    eventType: state.eventTypes.records[ownProps.eventTypeId],
    isFetching: state.eventTypes.fetching.find(id => id === ownProps.eventTypeId)
})

export default connect(mapStateToProps)(BootstrapPlaybook)

const IsBootstrapNeeded = (props) => !props.eventType && !props.isFetching

const BootstrapIfNeeded = (props) => {
    if(IsBootstrapNeeded(props))
    {
        props.dispatch(props.eventTypeActions.fetchEventType(props.eventTypeId))
    }
}

