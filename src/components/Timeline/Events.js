import React from 'react'
import Event from './Event'

export const Events = (events, ticketId, incidentId) => {
  let localKey = 0
  return (
    Array.from(events)
      .map(event =>
        <Event
          key = {localKey++}
          incidentId = {incidentId}
          ticketId = {ticketId}
          event = {event}
        />
    )
  )
}

export default Events
