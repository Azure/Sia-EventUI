import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import ErrorMessage from 'components/elements/ErrorMessage'
import LoadingMessage from 'components/elements/LoadingMessage'
import Highlight from 'components/elements/Highlight'
import EventCard from 'components/Timeline/Event/EventCard'
import BootstrapPlaybook from 'components/Timeline/Playbook/BootstrapPlaybook'
import * as eventTypeActions from 'actions/eventTypeActions'

const eventHasNoAttachedDisplayText = (event) =>
  !(event && event.data && event.data.DisplayText)

export const Event = ({
  eventTypeIsFetching,
  eventTypeIsError,
  event,
  ticketId
}) => eventTypeIsFetching && eventHasNoAttachedDisplayText(event)
? <LoadingMessage
  message={'Fetching Event Type Information'}
  actionForRetry={eventTypeActions.fetchEventType(event.eventTypeId)}
/>
: eventTypeIsError && eventHasNoAttachedDisplayText(event)
  ? <ErrorMessage
    message={`Error fetching eventType: ${event.eventTypeId}`}
    actionForRetry={eventTypeActions.fetchEventType(event.eventTypeId)}
  />
  : <DisplayEvent
    event={event}
    ticketId={ticketId}
  />

export const mapStateToEventProps = (state, ownProps) => {
  const { event, ticketId } = ownProps

  return {
    eventTypeIsFetching: state.eventTypes.fetching.includes(event.eventTypeId),
    eventTypeIsError: state.eventTypes.error.includes(event.eventTypeId),
    event,
    ticketId
  }
}

const animationDelayAsSecondsString = (event) =>
  event && event.timeReceived
    ? event.timeReceived.diffNow('seconds').toObject().seconds + 's'
    : null

export const DisplayEvent = ({event, ticketId}) => <Highlight
  animationDelay={animationDelayAsSecondsString(event)}
>
  <BootstrapPlaybook eventTypeId={event.eventTypeId} />
  <EventCard event={event} ticketId={ticketId} />
</Highlight>

export const ConnectedEvent = connect(mapStateToEventProps)(Event)

export const Events = ({events, ticketId, incidentId}) => <div>
  {Array.from(events).map(event =>
    <ConnectedEvent
      key={event.id}
      event={event}
      ticketId={ticketId}
    />
  )}
</div>

Events.propTypes = {
  events: PropTypes.array.isRequired,
  ticketId: PropTypes.string.isRequired,
  incidentId: PropTypes.number
}

export default Events
