import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { DateTime } from 'luxon'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import BootstrapPlaybook from 'components/Timeline/Playbook/BootstrapPlaybook'
import Playbook from 'components/Timeline/Playbook/Playbook'
import { LoadTextFromEvent, TestConditionSet } from 'services/playbookService'
import ErrorMessage from 'components/elements/ErrorMessage'
import LoadingMessage from 'components/elements/LoadingMessage'
import * as eventTypeActions from 'actions/eventTypeActions'
import timeFormattedToMultipleZones from 'helpers/timeFormattedToMultipleZones'

export const animationDelayAsSecondsString = (event) =>
  event.timeReceived.diffNow('seconds').toObject().seconds + 's'

export const Event = ({
    text,
    time,
    backgroundColor,
    incidentId,
    ticketId,
    eventTypeId,
    eventTypeIsFetching,
    eventTypeIsError,
    eventId,
    event,
    actions
}) => {
  const itemHighlight = (event && event.timeReceived) ? {
    animationName: 'yellowfade',
    animationDuration: '30s',
    animationDelay: animationDelayAsSecondsString(event)
  } : {}
  const isAllPlaybookInfoAvailable = !!(actions && Array.isArray(actions) && actions.length > 0)
  const missingId = eventTypeId
  return eventTypeIsFetching && !eventHasValidDisplayText(event)
        ? <LoadingMessage
          message={'Fetching Event Type Information'}
          actionForRetry={eventTypeActions.fetchEventType(eventTypeId)}
          />
        : eventTypeIsError && !eventHasValidDisplayText(event)
          ? ErrorMessage(`Error fetching eventType: ${missingId}`, eventTypeActions.fetchEventType(eventTypeId), time, backgroundColor)
            : <div style={itemHighlight}>
              <BootstrapPlaybook
                eventId={eventId}
                eventTypeId={eventTypeId}
                ticketId={ticketId}
                incidentId={incidentId}
        />
              <Card
                className='incident-card'
                style={{ backgroundColor }}
        >
                <CardHeader
                  title={ticketId ? `${ticketId}: ${text}` : text}
                  subtitle={timeFormattedToMultipleZones(time)}
                  actAsExpander
                  showExpandableButton
                  iconStyle={{
                    color: isAllPlaybookInfoAvailable ? 'black' : 'Lightgrey'
                  }}
            />
                {
              isAllPlaybookInfoAvailable &&
              <CardText expandable>
                Select the Actions below:
                <Playbook
                  eventId={eventId}
                  eventTypeId={eventTypeId}
                  ticketId={ticketId}
                  incidentId={incidentId}
                  actions={actions}
                />
              </CardText>
            }
              </Card>
            </div>
}

Event.propTypes = {
  text: PropTypes.string.isRequired,
  time: PropTypes.instanceOf(DateTime),
  backgroundColor: PropTypes.string,
  ticketId: PropTypes.string,
  eventId: PropTypes.number,
  eventTypeId: PropTypes.number,
  eventTypeIsFetching: PropTypes.bool,
  event: PropTypes.object
}

const eventHasValidDisplayText = (event) => event && event.data && event.data.DisplayText

export const mapStateToEventProps = (state, ownProps) => {
  const event = ownProps.event
  const eventType = state.eventTypes.records[event.eventTypeId]
  const ticket = state.tickets.map[ownProps.ticketId]
  const actions = eventType ? eventType.actions : null
  var populatedConditionSetTest = TestConditionSet(event, ticket, eventType)
  const qualifiedActions = actions
    ? actions.filter(
        action => action.conditionSets.reduce(
            (allConditionSetsMet, currentConditionSet) => allConditionSetsMet
            ? populatedConditionSetTest(currentConditionSet)
            : false,
             true
        )
    ) : []
  return {
    ...ownProps,
    ticket,
    eventId: event.id,
    eventTypeId: event.eventTypeId,
    eventTypeIsFetching: state.eventTypes.fetching.includes(event.eventTypeId),
    eventTypeIsError: state.eventTypes.error.includes(event.eventTypeId),
    time: DateTime.fromISO(event.occurred ? event.occurred : event.Occurred),
    dismissed: event.dismissed,
    backgroundColor: event.backgroundColor,
    text: LoadTextFromEvent(event, eventType, ticket),
    actions: qualifiedActions
  }
}

export default connect(mapStateToEventProps)(Event)
