import React from 'react'
import TimePicker from 'material-ui/TimePicker'
import DatePicker from 'material-ui/DatePicker'
import { DateTime } from 'luxon'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import * as filterActions from 'actions/filterActions'

export const TimeAndDatePicker = ({
  filters,
  updateFilterStartDate,
  updateFilterStartTime,
  updateFilterEndDate,
  updateFilterEndTime,
  dispatch
}) => <div>
  <DatePicker
    value={DateTime.fromISO(filters.startTime).toJSDate()}
    hintText='Select a start date'
    onChange={(event, date) => {
      dispatch(updateFilterStartDate(DateTime.fromJSDate(date).toISODate().toString()))
    }}
  />
  <TimePicker
    value={DateTime.fromISO(filters.startTime).toJSDate()}
    format='24hr'
    hintText='Select a start time'
    onChange={(event, time) => {
      dispatch(updateFilterStartTime(DateTime.fromJSDate(time).toISOTime().toString()))
    }}
  />
  <DatePicker
    value={DateTime.fromISO(filters.endTime).toJSDate()}
    hintText='Select an end date'
    onChange={(event, date) => {
      dispatch(updateFilterEndDate(DateTime.fromJSDate(date).toISODate().toString()))
    }}
  />
  <TimePicker
    value={DateTime.fromISO(filters.endTime).toJSDate()}
    format='24hr'
    hintText='Select an end time'
    onChange={(event, time) => {
      dispatch(updateFilterEndTime(DateTime.fromJSDate(time).toISOTime().toString()))
    }}
  />
</div>

TimeAndDatePicker.propTypes = {
  dispatch: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired,
  updateFilterStartDate: PropTypes.func.isRequired,
  updateFilterStartTime: PropTypes.func.isRequired,
  updateFilterEndDate: PropTypes.func.isRequired,
  updateFilterEndTime: PropTypes.func.isRequired
}

export const mapStateToProps = (state) => ({
  filters: state.events.filter,
  updateFilterStartDate: filterActions.updateFilterStartDate,
  updateFilterStartTime: filterActions.updateFilterStartTime,
  updateFilterEndDate: filterActions.updateFilterEndDate,
  updateFilterEndTime: filterActions.updateFilterEndTime
})

export default connect(mapStateToProps)(TimeAndDatePicker)
