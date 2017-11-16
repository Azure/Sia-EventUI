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
    return  HasValidDisplayTemplatePattern(eventType)? eventType.displayTemplate.pattern
    : (HasValidName(eventType) ? eventType.name : 'Loading event information...')
  else if (HasValidData(event))
    return HasValidDisplayText(event.data) ? event.data.displayText : JSON.stringify(event.data)
  else
    return 'Loading event information...'
}

const HasValidDisplayTemplatePattern = (eventType) => {
  return eventType.displayTemplate && eventType.displayTemplate.pattern && eventType.displayTemplate.pattern.length > 0 ? true : false
}

const HasValidName = (eventType) => {
  return eventType.name && eventType.name.length > 0 ? true: false
}

const HasValidData = (event) => {
  return event.data ? true: false
}

const HasValidDisplayText = (data) => {
  return data.displayText ? true: false
}

export default Events