import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import BootstrapPlaybook from './Playbook/BootstrapPlaybook'
import Playbook from './Playbook/Playbook'
import { LoadTextFromEvent } from '../../services/playbookService'
import LoadingMessage from '../elements/LoadingMessage'
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
    event
}) => {
    const itemHighlight = (event && event.timeReceived) ? {
        animationName: 'yellowfade',
        animationDuration: '30s',
        animationDelay: -(moment().diff(event.timeReceived, 'seconds')) + 's'
    } : {}
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
        >
            <CardHeader
                title={ticketId ? `${ticketId}: ${text}` : text}
                subtitle={time ? time.format('LTS') : 'Time unknown!'}
                actAsExpander={true}
                showExpandableButton={true}
            />
            <CardText expandable={true}>
                Select the Actions below:
                <Playbook
                    eventId={eventId}
                    eventTypeId={eventTypeId}
                    ticketId={ticketId}
                    incidentId={incidentId}
                />
            </CardText>
        </Card>
    </div>
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
    const ticket = state.tickets.map[ownProps.ticketId]
    const engagement = state.engagements.list.find(engagement => engagement.id === ownProps.engagementId)
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
        text: LoadTextFromEvent(event, eventType, ticket, engagement)
    }
}

export default connect(mapStateToEventProps)(Event)
