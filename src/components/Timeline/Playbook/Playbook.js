import React from 'react'
import { connect } from 'react-redux'
import LoadingMessage from 'components/elements/LoadingMessage'
import ErrorMessage from 'components/elements/ErrorMessage'
import DisplayPlaybook from 'components/Timeline/Playbook/DisplayPlaybook'
import * as eventActions from 'actions/eventActions'
import * as eventTypeActions from 'actions/eventTypeActions'

export const Playbook = ({
    eventTypeId,
    incidentId,
    eventId,
    ticketId,
    eventIsFetching,
    eventIsError,
    eventTypeIsFetching,
    eventTypeIsError,
    actions,
    engagementId
}) => {
  if (eventIsFetching) {
    return LoadingMessage('Fetching event information...', eventActions.fetchEvent(incidentId, eventId))
  }
  if (eventTypeIsFetching) {
    return LoadingMessage('Fetching event type information...', eventTypeActions.fetchEventType(eventTypeId))
  }
  if (eventIsError) {
    return ErrorMessage('Error fetching event!', eventActions.fetchEvent(incidentId, eventId))
  }
  if (eventTypeIsError) {
    return ErrorMessage('Error fetching eventType!', eventTypeActions.fetchEventType(eventTypeId))
  }
  return <DisplayPlaybook
    eventTypeId={eventTypeId}
    eventId={eventId}
    ticketId={ticketId}
    incidentId={incidentId}
    actions={actions}
    engagementId={engagementId}
    />
}

export const mapStateToPlaybookProps = (state, ownProps) => ({
  eventTypeIsFetching: state.eventTypes.fetching.includes(ownProps.eventTypeId),
  eventTypeIsError: state.eventTypes.error.includes(ownProps.eventTypeId),
  eventIsFetching: state.events.fetching.includes(ownProps.eventid),
  eventIsError: state.events.error.includes(ownProps.eventId),
  ...ownProps
})

export default connect(mapStateToPlaybookProps)(Playbook)
