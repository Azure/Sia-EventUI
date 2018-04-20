import { connect } from 'react-redux'
import React from 'react'
import { DateTime } from 'luxon'

const TimeDisplay = ({time, timezone}) => {
  return (
  <div>
    <div>Passed in: {time.toString()}</div>
    <div>
      Configured ({timezone}): {
        DateTime
          .fromISO(time)
          .setZone(timezone)
          .toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS)
        }
    </div>
  </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    timezone: 'America/Los_Angeles'
  }
}

export default connect(mapStateToProps)(TimeDisplay)
