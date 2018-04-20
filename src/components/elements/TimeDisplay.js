import { connect } from 'react-redux'
import React from 'react'
import { DateTime } from 'luxon'

const TimeDisplay = ({time, timezones}) => {
  return (
  <div>
    <div>Passed in: {time.toString()}</div>
    <div>
      {timezones.map(timezone => (
        <div>
          Configured ({timezone}): {
            DateTime
              .fromISO(time)
              .setZone(timezone)
              .toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS)
            }
        </div>
      ))}
    </div>
  </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    timezones: state.timePreferences,
    time: ownProps.time
  }
}

export default connect(mapStateToProps)(TimeDisplay)
