import { connect } from 'react-redux'
import React from 'react'
import { DateTime } from 'luxon'

const TimeDisplay = ({time, timezone}) => (
  <div>
    <div>Passed in: {time.toString()}</div>
    <div>Configured ({timezone}): {time.setZone(timezone).toString()}</div>
  </div>
)

const mapStateToProps = (state, ownProps) => {
  return {
    timezone: 'UTC'
  }
}

export default connect(mapStateToProps)(TimeDisplay)
