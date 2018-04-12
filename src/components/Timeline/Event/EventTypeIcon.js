import React from 'react'
import { connect } from 'react-redux'
import * as Icons from 'material-ui/svg-icons'

export const EventTypeIcon = ({
  IconType
}) => IconType ? <IconType /> : null

export const mapStateToEventTypeIconProps = (state, ownProps) => {
  const eventType = state.eventTypes.records[ownProps.eventTypeId]
  const IconType = Icons[eventType.Icon]

  const typeOfIcon = typeof IconType

  debugger

  return typeof IconType === 'function'
    ? {
      IconType
    }
    : {}
}

export default connect(mapStateToEventTypeIconProps)(EventTypeIcon)
