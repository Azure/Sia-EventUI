import React, { Component } from 'react'
import TimePicker from 'material-ui/TimePicker'
import DatePicker from 'material-ui/DatePicker'
import { FlatButton } from 'material-ui'
import { DateTime } from 'luxon'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import * as filterActions from 'actions/filterActions'

class TimeAndDatePicker extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    filters: PropTypes.object,
    history: PropTypes.object.isRequired
  }

  constructor () {
    super()
    this.state = { startDate: null, startTime: null, endDate: null, endTime: null }
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
    if (!(start && end)) {
      end = DateTime.local().toISO()
      start = DateTime.local().minus({days: 1}).toISO()
    }
    const newFilter = Object.assign(...filters, { startTime: start, endTime: end })
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
