import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import BootstrapPlaybook from './Playbook/BootstrapPlaybook'

const Event = ({ text, time, backgroundColor, incidentId, ticketId, eventTypeId, event, eventTypeActions }) => {
    return (<Card
                className="incident-card"
                style={{ backgroundColor }}
            >
                <CardHeader
                    title={ticketId ? `${ticketId}: ${text}` : text}
                    subtitle={time.format('LTS')}
                    actAsExpander={true}
                    showExpandableButton={true}
                />
                <CardText expandable={true}>
                    Select the Actions below:
                    <BootstrapPlaybook
                        eventId={event.id}
                        eventTypeId={eventTypeId}
                        ticketId={ticketId}
                        incidentId={incidentId}
                        eventTypeActions={eventTypeActions}
                    />
                </CardText>
            </Card>
)}

Event.propTypes = {
    dismissed: PropTypes.bool,
    text: PropTypes.string.isRequired,
    time: PropTypes.instanceOf(moment),
    backgroundColor: PropTypes.string,
    ticketId: PropTypes.string
}

export default Event