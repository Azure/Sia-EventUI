import React, { Component } from 'react'
import TimePicker from 'material-ui/TimePicker'
import DatePicker from 'material-ui/DatePicker'
import { FlatButton } from 'material-ui'
import { DateTime } from 'luxon'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import deepEqual from 'deep-equal'

import * as filterActions from 'actions/filterActions'

export const TimeAndDatePicker = ({filters, dispatch}) => <div>
  <DatePicker
    value={filters.startTime && filters.startTime.includes('T') ? filters.startTime.split('T')[0] : null }
    hintText='Select a start date'
    onChange={(event, date) => {
      dispatch(filterActions.updateFilterStartDate(DateTime.fromJSDate(date).toISODate().toString()))
    }}
  />
  <TimePicker
    value={filters.startTime && filters.startTime.includes('T') ? filters.startTime.split('T')[1] : null }
    format='24hr'
    hintText='Select a start time'
    onChange={(event, time) => {
      dispatch(filterActions.updateFilterStartTime(DateTime.fromJSDate(time).toISOTime().toString()))
    }}
  />
  <DatePicker
    value={filters.endTime && filters.endTime.includes('T') ? filters.endTime.split('T')[0] : null }
    hintText='Select an end date'
    onChange={(event, date) => {
      dispatch(filterActions.updateFilterEndDate(DateTime.fromJSDate(date).toISODate().toString()))
    }}
  />
  <TimePicker
    value={filters.endTime && filters.endTime.includes('T') ? filters.endTime.split('T')[1] : null }
    format='24hr'
    hintText='Select an end time'
    onChange={(event, time) => {
      dispatch(filterActions.updateFilterEndTime(DateTime.fromJSDate(time).toISOTime().toString()))
    }}
  />
</div>

TimeAndDatePicker.propTypes = {
  dispatch: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired
}

export const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  filters: state.events.filter
})

export default connect(mapStateToProps)(TimeAndDatePicker)
