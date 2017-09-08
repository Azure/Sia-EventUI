import React from 'react'
import PropTypes from 'prop-types'
import FlatButton from 'material-ui/FlatButton'
import moment from 'moment'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'


const Event = ({ text, time, backgroundColor, ticketId }) => {
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
                    <CardActions>
                        <FlatButton label="Action1" />
                        <FlatButton label="Action2" />
                        <FlatButton label="Dimiss" />
                    </CardActions>
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