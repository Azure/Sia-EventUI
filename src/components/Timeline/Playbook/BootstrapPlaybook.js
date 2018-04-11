import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { BootstrapIfNeeded } from 'services/playbookService'

export class BootstrapPlaybook extends React.Component {
  static propTypes = {
    eventType: PropTypes.object,
    eventTypeId: PropTypes.number.isRequired,
    isFetching: PropTypes.bool.isRequired,
    isError: PropTypes.bool.isRequired
  }

  componentDidMount () {
    BootstrapIfNeeded(this.props)
  }

  componentDidUpdate () {
    BootstrapIfNeeded(this.props)
  }

  render () {
    return null
  }
}

export const mapStateToBootstrapPlaybookProps = (state, ownProps) => ({
  eventType: state.eventTypes.records[ownProps.eventTypeId],
  isFetching: state.eventTypes.fetching.includes(ownProps.eventTypeId),
  isError: state.eventTypes.error.includes(ownProps.eventTypeId),
  ...ownProps
})

export default connect(mapStateToBootstrapPlaybookProps)(BootstrapPlaybook)
