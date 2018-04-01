import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { applyFilter } from 'actions/filterActions'

export class ApplyFilterOnMount extends Component {
  static propTypes = {
    filters: PropTypes.object.isRequired,
    filterPreference: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount () {
    const { dispatch, history, filters, filterPreference } = this.props
    dispatch(applyFilter(history, filters, filterPreference))
  }

  render () {
    return <div style={this.props.style ? this.props.style : undefined}>{this.props.children}</div>
  }
}

export const mapStateToApplyFilterProps = (state, ownProps) => ({
  filters: state.events.filter,
  filterPreference: state.signalR.filterPreferences.eventFilterType,
  ...ownProps
})

export default withRouter(connect(mapStateToApplyFilterProps)(ApplyFilterOnMount))
