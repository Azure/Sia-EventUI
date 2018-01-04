import React from 'react'
import { connect } from 'react-redux'
import LoadingMessage from '../../elements/LoadingMessage'
import DisplayPlaybook from './DisplayPlaybook'
import * as eventActions from '../../../actions/eventActions'
import * as eventTypeActions from '../../../actions/eventTypeActions'

export const Playbook = ({
    eventId,
    eventTypeId,
    ticketId,
    incidentId,
    eventIsFetching,
    eventTypeIsFetching,
    actions
}) => eventIsFetching
    ? eventTypeIsFetching
        ? LoadingMessage('Fetching event type information...', eventTypeActions.fetchEventType(eventTypeId))
        : LoadingMessage('Fetching event information...', eventActions.fetchEvent(incidentId, eventId))
    : <DisplayPlaybook
      eventTypeId={eventTypeId}
      eventId={eventId}
      incidentId={incidentId}
      ticketId={ticketId}
      actions={actions}
    />


export const mapStateToPlaybookProps = (state, ownProps) => ({
    eventTypeIsFetching: state.eventTypes.fetching.includes(ownProps.eventTypeId),
    eventIsFetching: state.events.fetching.includes(ownProps.eventid),
    ...ownProps
})

export default connect(mapStateToPlaybookProps)(Playbook)
