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
          text = {LoadTextFromEvent(event, eventTypes) }
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

const LoadTextFromEvent = (event, eventTypes) => {
  const eventType = eventTypes[event.eventTypeId]
  if (eventType) 
    return eventType.displayTemplate.pattern ? eventType.displayTemplate.pattern 
    : (eventType.name ? eventType.name : 'Loading event information...')
  else
    return event.data.displayText ? event.data.displayText : JSON.stringify(event.data)
}

export default Events