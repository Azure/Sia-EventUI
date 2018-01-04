import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import BootstrapPlaybook from './Playbook/BootstrapPlaybook'
import Playbook from './Playbook/Playbook'
import { LoadTextFromEvent } from '../../services/playbookService'
import ErrorMessage from '../elements/ErrorMessage'
import LoadingMessage from '../elements/LoadingMessage'
import { TestConditionSet } from '../../services/playbookService'
import * as eventTypeActions from '../../actions/eventTypeActions'

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
        animationDelay: -(moment().diff(event.timeReceived, 'seconds')) + 's'
    } : {}
    const isAllPlaybookInfoAvailable = actions.length > 0
    const iconColor = isAllPlaybookInfoAvailable ? 'black' : 'Lightgrey'

    return eventTypeIsFetching && !eventHasValidDisplayText(event)
        ? LoadingMessage('Fetching Event Type Information', eventTypeActions.fetchEventType(eventTypeId))
        : eventTypeIsError && !eventHasValidDisplayText(event)
            ? ErrorMessage('Error fetching eventType!', eventTypeActions.fetchEventType(eventTypeId))
            : <div style={itemHighlight}>
        <BootstrapPlaybook
            eventId={eventId}
            eventTypeId={eventTypeId}
            ticketId={ticketId}
            incidentId={incidentId}
        />
        <Card
            className="incident-card"
            style={{ backgroundColor }}
            expanded={isAllPlaybookInfoAvailable ? null : false}
        >
            <CardHeader
                title={ticketId ? `${ticketId}: ${text}` : text}
                subtitle={time ? time.local().format('LTS') : 'Time unknown!'}
                actAsExpander={true}
                showExpandableButton={true}
                iconStyle={{
                  color: iconColor
                }}
            />
            {
              isAllPlaybookInfoAvailable &&
              <CardText expandable={true}>
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
  const engagement = state.engagements.list.find(engagement => engagement.id === ownProps.engagementId)
  const actions = eventType.actions
  var populatedConditionSetTest = TestConditionSet(event, ticket, eventType, engagement)
  const qualifiedActions = actions.filter(
    action => action.conditionSets.reduce(
      (allConditionSetsMet, currentConditionSet) => allConditionSetsMet
        ? populatedConditionSetTest(currentConditionSet)
        : false,
      true
    )
  )
    return {
        ...ownProps,
        ticket,
        engagement,
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
