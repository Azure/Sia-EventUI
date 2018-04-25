import { connect } from 'react-redux'
import React from 'react'
import { DateTime } from 'luxon'

import { timeAndDateFormat } from 'helpers/timeFormattedToMultipleZones'

export const TimeDisplayComponent = ({time, timezones}) => {
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

// TODO: Test convertedTime, especially w/ invalid DateTime values
const convertedTime = (time, timezone) =>
  parseTime(time)
    .setZone(timezone)
    .toLocaleString(timeAndDateFormat)

export const parseTime = (time) =>
  time instanceof DateTime
    ? time
    : DateTime.fromISO(time)

export const mapStateToProps = (state, ownProps) => ({
  timezones: state.timePreferences.displayTimezones,
  time: ownProps.time
})

export default connect(mapStateToProps)(TimeDisplayComponent)
