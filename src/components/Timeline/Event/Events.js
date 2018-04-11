import React from 'react'
import { connect } from 'react-redux'

import Highlight from 'components/elements/Highlight'
import EventCard from 'components/Timeline/Event/EventCard'
import { BootstrapPlaybook } from 'components/Timeline/Playbook/BootstrapPlaybook'

export const Events = ({events, ticketId, incidentId}) => <div>
  {Array.from(events)
    .map(event =>
      <ConnectedEvent
        key={event.id}
        event={event}
        ticketId={ticketId}
      />)
  }
</div>

export const Event = ({
  eventTypeId,
  eventTypeIsFetching,
  eventTypeIsError,
  event,
  ticketId
}) => eventTypeIsFetching && !eventHasValidDisplayText(event)
? <LoadingMessage
  message={'Fetching Event Type Information'}
  actionForRetry={eventTypeActions.fetchEventType(eventTypeId)}
/>
: eventTypeIsError && !eventHasValidDisplayText(event)
  ? ErrorMessage(
    `Error fetching eventType: ${eventTypeId}`,
    eventTypeActions.fetchEventType(eventTypeId),
    DateTime.fromISO(event.occurred ? event.occurred : event.Occurred),
    backgroundColor
  )
  : <DisplayEvent
    event={event}
  />

export const mapStateToEventProps = (state, ownProps) => {
  const event = ownProps.event
  const ticketId = ownProps.ticketId

  return {
    eventTypeId: event.eventTypeId,
    eventTypeIsFetching: state.eventTypes.fetching.includes(event.eventTypeId),
    eventTypeIsError: state.eventTypes.error.includes(event.eventTypeId),
    event,
    ticketId
  }
}

export const ConnectedEvent = connect(mapStateToEventProps)(Event)

export const animationDelayAsSecondsString = (event) =>
  event.timeReceived.diffNow('seconds').toObject().seconds + 's'

export const DisplayEvent = ({event}) => <Highlight
  animationDelay={animationDelayAsSecondsString(event)}
>
  <BootstrapPlaybook eventTypeId={event.eventTypeId} />
  <EventCard />
</Highlight>

export default Events
