import React from 'react'
import PropTypes from 'prop-types'
import Play from './Play'

export const DisplayPlaybook = ({
    actions,
    eventTypeId,
    eventId,
    ticketId,
    engagementId,
    incidentId
}) => {
    let localKey = 0
    return <div>
        {actions.map(action =>
            <div key={localKey++}>
                <span>
                    {action.name}
                </span>
                <br/>
                <Play
                    action={action}
                    eventTypeId={eventTypeId}
                    eventId={eventId}
                    incidentId={incidentId}
                    ticketId={ticketId}
                    engagementId={engagementId}
                />
            </div>
        )}
    </div>
}

DisplayPlaybook.propTypes = {
    actions: PropTypes.array.isRequired,
    eventTypeId: PropTypes.number.isRequired,
    eventId: PropTypes.number.isRequired,
    ticketId: PropTypes.string.isRequired,
    engagementId: PropTypes.number,
    incidentId: PropTypes.number.isRequired
}


export default DisplayPlaybook
