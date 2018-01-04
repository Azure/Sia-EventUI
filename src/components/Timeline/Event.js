import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import BootstrapPlaybook from './Playbook/BootstrapPlaybook'
import Playbook from './Playbook/Playbook'
import { LoadTextFromEvent } from '../../services/playbookService'
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
    eventId,
    event,
    actions
}) => {
    const itemHighlight = (event && event.timeReceived) ? {
        animationName: 'yellowfade',
        animationDuration: '30s',
        animationDelay: -(moment().diff(event.timeReceived, 'seconds')) + 's'
    } : {}
    const expand = actions.length > 0
    const iconColor = expand ? 'black':'Lightgrey'
    return eventTypeIsFetching && (!event || !event.data || !event.data.DisplayText)
        ? LoadingMessage('Fetching Event Type Information', eventTypeActions.fetchEventType(eventTypeId))
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
          expanded={expand ? null : false}
        >
          <CardHeader
            title={ticketId ? `${ticketId}: ${text}` : text}
            subtitle={time ? time.format('LTS') : 'Time unknown!'}
            actAsExpander={true}
            showExpandableButton={true}
            iconStyle={{
              color: iconColor
            }}
          />
          {
            expand &&
            <CardText expandable={true} >
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
    </div >
}

Event.propTypes = {
    text: PropTypes.string.isRequired,
    time: PropTypes.instanceOf(moment),
    backgroundColor: PropTypes.string,
    ticketId: PropTypes.string
}

export const mapStateToEventProps = (state, ownProps) => {
    const event = ownProps.event
    const eventType = state.eventTypes.records[event.eventTypeId]
    const eventTypeIsFetching = state.eventTypes.fetching.includes(event.eventTypeId)
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
        eventType,
        engagement,
        eventId: event.id,
        eventTypeId: event.eventTypeId,
        eventTypeIsFetching,
        time: moment(event.occurred ? event.occurred : event.Occurred),
        dismissed: event.dismissed,
        backgroundColor: event.backgroundColor,
        text: LoadTextFromEvent(event, eventType, ticket, engagement),
        actions: qualifiedActions
    }
}

export default connect(mapStateToEventProps)(Event)
