import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { BootstrapIfNeeded } from 'services/playbookService'

export class BootstrapPlaybook extends React.Component {
  static propTypes = {
    bootStrapIfNeeded: PropTypes.func,
    eventType: PropTypes.object,
    isFetching: PropTypes.bool
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
  ...ownProps,
  eventType: state.eventTypes.records[ownProps.eventTypeId],
  isFetching: state.eventTypes.fetching.includes(ownProps.eventTypeId),
  isError: state.eventTypes.error.includes(ownProps.eventTypeId)
})

export default connect(mapStateToBootstrapPlaybookProps)(BootstrapPlaybook)
