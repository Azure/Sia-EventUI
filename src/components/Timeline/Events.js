import React from 'react'
import Event from './Event'

export const Events = (events, eventActions, eventTypeActions, ticketId, incidentId) => {
  let localKey = 0
  return (
    Array.from(events)
      .map(event =>
        <Event
          key = {localKey++}
          incidentId = {incidentId}
          ticketId = {ticketId}
          event = {event}
          eventActions = {eventActions}
          eventTypeActions = {eventTypeActions}
        />
    )
  )
}

export default Events
