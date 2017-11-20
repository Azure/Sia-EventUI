import React from 'react'
import { connect } from 'react-redux'
import { BootstrapIfNeeded } from '../../../services/playbookService'

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
        return null
    }
}

export const mapStateToBootstrapPlaybookProps = (state, ownProps) => ({
    ...ownProps,
    eventType: state.eventTypes.records[ownProps.eventTypeId],
    isFetching: state.eventTypes.fetching.find(id => id === ownProps.eventTypeId)
})

export default connect(mapStateToBootstrapPlaybookProps)(BootstrapPlaybook)


