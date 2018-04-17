import { connect } from 'react-redux'
import React from 'react'

const TimeDisplay = ({time, timezone}) => (
  <span>Time... enough</span>
)

const mapStateToProps = (state, ownProps) => {
  return {
    timezone: 'lol jk'
  }
}

export default connect(mapStateToProps)(TimeDisplay)
