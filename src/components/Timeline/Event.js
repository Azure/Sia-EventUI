import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import BootstrapPlaybook from './Playbook/BootstrapPlaybook'
import Playbook from './Playbook/Playbook'
import { LoadTextFromEvent } from '../../services/playbookService'

export const Event = ({ text, time, backgroundColor, incidentId, ticketId, eventType, eventTypeId, eventId, eventActions, eventTypeActions }) => {
    return (
    <div>
        <BootstrapPlaybook
            eventId={eventId}
            eventTypeId={eventTypeId}
            ticketId={ticketId}
            incidentId={incidentId}
            eventTypeActions={eventTypeActions}
        />
        <Card
            className="incident-card"
            style={{ backgroundColor }}
        >
            <CardHeader
                title={ticketId ? `${ticketId}: ${text}` : text}
                subtitle={time.format('LT')}
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
                    eventActions={eventActions}
                />
            </CardText>
        </Card>
    </div>
)}

Event.propTypes = {
    dismissed: PropTypes.bool,
    text: PropTypes.string.isRequired,
    time: PropTypes.instanceOf(moment),
    backgroundColor: PropTypes.string,
    ticketId: PropTypes.string
}

export const mapStateToEventProps = (state, ownProps) => {
    const event = ownProps.event
    const eventType = state.eventTypes.records[ownProps.event.eventTypeId]
    const ticket = state.tickets.map[ownProps.ticketId]
    const engagement = state.engagements.list.find(engagement => engagement.id === ownProps.engagementId)
    return {
        ...ownProps,
        eventType,
        ticket,
        engagement,
        eventId: event.id,
        time: moment(event.occurred),
        dismissed: event.dismissed,
        backgroundColor: event.backgroundColor,
        text: LoadTextFromEvent(event, eventType, ticket, engagement)
    }
}

export default Event