import React from 'react'
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
    return actions.map(action => <div key={localKey++}>
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
    </div>)}
