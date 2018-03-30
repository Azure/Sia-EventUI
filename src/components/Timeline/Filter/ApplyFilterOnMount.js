import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { applyFilter } from 'services/filterService'

export class ApplyFilterOnMount extends Component {
  static propTypes = {
    filters: PropTypes.object.isRequired,
    filterPreference: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount () {
    const { dispatch, history, filters, filterPreference } = this.props
    dispatch(filterActions.applyFilter(history, filters, filterPreference))
  }

  render () {
    return this.props.children
  }
}

export const mapStateToApplyFilterOnMountProps = (state, ownProps) => ({
  filters: state.events.filter,
  filterPreference: state.signalR.filterPreferences.eventFilterType,
  ...ownProps
})

export default withRouter(connect(mapStateToApplyFilterOnMountProps)(ApplyFilterOnMount))