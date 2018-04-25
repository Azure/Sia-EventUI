import { connect } from 'react-redux'
import React from 'react'
import { DateTime } from 'luxon'

const TimeDisplay = ({time, timezones}) => {
  return (
    <div>
      <div>Passed in: {time.toString()}</div>
      <div>
        {timezones
          .map(timezone => (
            <div key={timezone}>
              Configured ({timezone}): {
                DateTime
                  .fromISO(time)
                  .setZone(timezone)
                  .toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS)
                }
            </div>
          ))
        }
      </div>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
  timezones: state.timePreferences.timePreference,
  time: ownProps.time
})

export default connect(mapStateToProps)(TimeDisplay)
