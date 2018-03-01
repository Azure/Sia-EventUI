import React from 'react'
import Event from 'components/Timeline/Event'

export const Events = ({events, ticketId, incidentId}) => {
  return (<div>{
    Array.from(events)
    .map(event =>
      <Event
        key={event.id}
        incidentId={incidentId? incidentId: event.incidentId}
        ticketId={ticketId? ticketId: event.primaryTicketId}
        event={event}
      />
    )
    }</div>)
}

export default Events
