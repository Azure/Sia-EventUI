import React from 'react'
import TimePicker from 'material-ui/TimePicker'
import DatePicker from 'material-ui/DatePicker'
import { DateTime } from 'luxon'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import * as filterActions from 'actions/filterActions'

export const TimeAndDatePicker = ({filters, dispatch}) => <div>
  <DatePicker
    value={DateTime.fromISO(filters.startTime).toJSDate()}
    hintText='Select a start date'
    onChange={(event, date) => {
      dispatch(filterActions.updateFilterStartDate(DateTime.fromJSDate(date).toISODate().toString()))
    }}
  />
  <TimePicker
    value={DateTime.fromISO(filters.startTime).toJSDate()}
    format='24hr'
    hintText='Select a start time'
    onChange={(event, time) => {
      dispatch(filterActions.updateFilterStartTime(DateTime.fromJSDate(time).toISOTime().toString()))
    }}
  />
  <DatePicker
    value={DateTime.fromISO(filters.endTime).toJSDate()}
    hintText='Select an end date'
    onChange={(event, date) => {
      dispatch(filterActions.updateFilterEndDate(DateTime.fromJSDate(date).toISODate().toString()))
    }}
  />
  <TimePicker
    value={DateTime.fromISO(filters.endTime).toJSDate()}
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
