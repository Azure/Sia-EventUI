import React from 'react'
import moment from 'moment'
import Event from './Event'

export const Events = (events) => {
    let localKey = 0
    return (
        Array.from(events)
          .map(event =>
            <Event
              key = {localKey++}
              ticketId = {event.ticketId}
              dismissed = {event.dismissed}
              text = {GenerateTextFromEventType(event.eventTypeId) }
              time = {moment(event.occurred ? event.occurred : event.Occurred)}
              backgroundColor = {event.backgroundColor}
            />
        )
    )
}

const GenerateTextFromEventType = (eventType) => {
  switch(eventType){
    case 1:
      return 'Impact Detected'
    case 2:
      return 'Impact Start'
    case 3:
      return 'Impact Mitigated'
    case 4:
      return 'Incident Resolved'
    case 5:
      return 'Incident Acknowledged'
    default:
      return 'This Event has no text'
  }
}

export default Events