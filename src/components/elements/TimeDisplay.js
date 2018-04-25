import { connect } from 'react-redux'
import React from 'react'
import { DateTime } from 'luxon'

import { timeAndDateFormat } from 'helpers/timeFormattedToMultipleZones'

const TimeDisplay = ({time, timezones}) => {
  if (!time) {
    return null
  }

  return (
    <div>
      {timezones
        .map(timezone => (
          <div key={timezone}>({timezone}): {convertedTime(time, timezone)}</div>
        ))
      }
    </div>
  )
}

export const convertedTime = (time, timezone) =>
  parseTime(time)
    .setZone(timezone)
    .toLocaleString(timeAndDateFormat)

export const parseTime = (time) =>
  time instanceof DateTime
    ? time
    : DateTime.fromISO(time)

const mapStateToProps = (state, ownProps) => ({
  timezones: state.timePreferences.timePreference,
  time: ownProps.time
})

export default connect(mapStateToProps)(TimeDisplay)
