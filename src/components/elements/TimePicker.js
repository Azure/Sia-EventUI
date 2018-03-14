import React, { Component } from 'react'
import TimePicker from 'material-ui/TimePicker'
import DatePicker from 'material-ui/DatePicker'
import { FlatButton } from 'material-ui'
import { DateTime } from 'luxon'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import deepEqual from 'deep-equal'

import * as filterActions from 'actions/filterActions'

class TimeAndDatePicker extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    filters: PropTypes.object,
    history: PropTypes.object.isRequired
  }

  constructor () {
    super()
    this.state = {
      endDate: DateTime.local().toISODate().toString(),
      endTime: DateTime.local().toISOTime().toString(),
      startDate: DateTime.local().minus({day: 1}).toISODate().toString(),
      startTime: DateTime.local().toISOTime().toString()
    }
  }

  componentDidMount () {
    const { filters, dispatch, history } = this.props
    const { startDate, startTime, endDate, endTime } = this.state
    const newFilter = Object.assign({}, filters, {startTime: startDate + 'T' + startTime, endTime: endDate + 'T' + endTime})
    dispatch(filterActions.synchronizeFilters(newFilter, null, null, history))
  }

  componentDidUpdate (prevProps) {
    const { filters, dispatch, history } = this.props
    if (!deepEqual(prevProps.filters, filters)) {
      dispatch(filterActions.synchronizeFilters(filters, null, null, history))
    }
  }

  render () {
    return (
      <div>
        <DatePicker
          hintText='Select a start date'
          onChange={(event, date) => {
            this.setState({ startDate: DateTime.fromJSDate(date).toISODate().toString() })
          }}
                />
        <TimePicker
          format='24hr'
          hintText='Select a start time'
          onChange={(event, time) => {
            this.setState({ startTime: DateTime.fromJSDate(time).toISOTime().toString() })
          }}
                />
        <DatePicker
          hintText='Select an end date'
          onChange={(event, date) => {
            this.setState({ endDate: DateTime.fromJSDate(date).toISODate().toString() })
          }}
                />
        <TimePicker
          format='24hr'
          hintText='Select an end time'
          onChange={(event, time) => {
            this.setState({ endTime: DateTime.fromJSDate(time).toISOTime().toString() })
          }}
                />
        <FlatButton
          label='submit'
          primary
          onClick={() => this.loadUncorrelatedEvents()}
                />
      </div>
    )
  }

  loadUncorrelatedEvents () {
    const { dispatch, filters, history } = this.props
    const { startDate, startTime, endDate, endTime } = this.state
    let start = (startDate && startTime) ? startDate + 'T' + startTime : null
    let end = (endDate && endTime) ? endDate + 'T' + endTime : null
    const newFilter = Object.assign({}, filters, { startTime: start, endTime: end })
    dispatch(filterActions.synchronizeFilters(newFilter, null, null, history))
  }
}

export const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    dispatch: state.dispatch,
    filters: state.events.filter
  }
}

export default connect(mapStateToProps)(TimeAndDatePicker)
