import React from 'react'
import moment from 'moment'
import Event from './Event'

export const Events = (events, eventActions, eventTypeActions, ticketId, incidentId, eventTypes) => {
  let localKey = 0
  return (
    Array.from(events)
      .map(event =>
        <Event
          key = {localKey++}
          incidentId = {incidentId}
          ticketId = {ticketId}
          dismissed = {event.dismissed}
          text = {LoadTextFromEventType(event.eventTypeId, eventTypes) }
          time = {moment(event.occurred ? event.occurred : event.Occurred)}
          backgroundColor = {event.backgroundColor}
          eventId = {event.id}
          eventActions = {eventActions}
          eventTypeId = {event.eventTypeId}
          eventTypeActions = {eventTypeActions}
        />
    )
  )
}

const LoadTextFromEventType = (eventTypeId, eventTypes) => {
  const eventType = eventTypes[eventTypeId]
  if(!eventType) return 'Loading event information...'
  return eventType.name
}

export default Events