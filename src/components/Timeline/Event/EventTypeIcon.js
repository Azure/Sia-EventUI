import React from 'react'
import * as Icons from 'material-ui/svg-icons'

export const EventTypeIcon = ({
  IconType
}) => IconType ? <IconType /> : null

export const mapStateToEventTypeIconProps = (state, ownProps) => {
  const eventType = state.eventTypes.map[ownProps.eventTypeId]
  const IconType = Icons[eventType.Icon]

  return typeof IconType === 'function'
    ? {
      IconType
    }
    : {}
}
