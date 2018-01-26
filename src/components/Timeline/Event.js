import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import BootstrapPlaybook from 'components/Timeline/Playbook/BootstrapPlaybook'
import Playbook from 'components/Timeline/Playbook/Playbook'
import { LoadTextFromEvent, TestConditionSet } from 'services/playbookService'
import ErrorMessage from 'components/elements/ErrorMessage'
import LoadingMessage from 'components/elements/LoadingMessage'
import * as eventTypeActions from 'actions/eventTypeActions'

export const Event = ({
    text,
    time,
    backgroundColor,
    incidentId,
    ticketId,
    eventTypeId,
    eventTypeIsFetching,
    eventTypeIsError,
    missingEventTypeId,
    eventId,
    event,
    actions,
    engagementId
}) => {
  const itemHighlight = (event && event.timeReceived) ? {
    animationName: 'yellowfade',
    animationDuration: '30s',
    animationDelay: -(moment().diff(event.timeReceived, 'seconds')) + 's'
  } : {}
  const isAllPlaybookInfoAvailable = !!(actions && Array.isArray(actions) && actions.length > 0)
  const missingId = eventTypeId ? eventTypeId : null
  return eventTypeIsFetching && !eventHasValidDisplayText(event)
        ? LoadingMessage('Fetching Event Type Information', eventTypeActions.fetchEventType(eventTypeId))
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
                  subtitle={time ? time.local().format('LTS') : 'Time unknown!'}
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
                  engagementId={engagementId}
                />
              </CardText>
            }
              </Card>
            </div>
}

Event.propTypes = {
  text: PropTypes.string.isRequired,
  time: PropTypes.instanceOf(moment),
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
  const auth = state.auth
  const engagement = state.engagements.list.find(
    engagement => engagement &&
      engagement.incidentId === ownProps.incidentId &&
      engagement.participant &&
      engagement.participant.alias === auth.userAlias &&
      engagement.participant.team === auth.userTeam &&
      engagement.participant.role === auth.userRole
  )
  const actions = eventType ? eventType.actions : null
  var populatedConditionSetTest = TestConditionSet(event, ticket, eventType, engagement)
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
    engagementId: engagement ? engagement.id : null,
    eventId: event.id,
    eventTypeId: event.eventTypeId,
    eventTypeIsFetching: state.eventTypes.fetching.includes(event.eventTypeId),
    eventTypeIsError: state.eventTypes.error.includes(event.eventTypeId),
    time: moment(event.occurred ? event.occurred : event.Occurred),
    dismissed: event.dismissed,
    backgroundColor: event.backgroundColor,
    text: LoadTextFromEvent(event, eventType, ticket, engagement),
    actions: qualifiedActions
  }
}

export default connect(mapStateToEventProps)(Event)
