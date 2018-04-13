import React from 'react'
import Play from 'components/Timeline/Playbook/Play'

const wrapperStyle = {
  display: 'flex',
  flexWrap: 'wrap'
}

export const DisplayPlaybook = ({
    actions,
    eventTypeId,
    eventId,
    ticketId,
    incidentId
}) => {
  let localKey = 0
  return <div style={wrapperStyle}>
    {AreAnyActionsAvailable(actions)
      ? actions.map(action => DisplayAction(
      action,
      eventTypeId,
      eventId,
      ticketId,
      incidentId,
      localKey++
    ))
    : null}
  </div>
}

const AreAnyActionsAvailable = (actions) =>
    actions && Array.isArray(actions) && actions.length

export const DisplayAction = (
  action,
  eventTypeId,
  eventId,
  ticketId,
  incidentId,
  key
) => <div key={key}>
  <Play
    action={action}
    eventTypeId={eventTypeId}
    eventId={eventId}
    incidentId={incidentId}
    ticketId={ticketId}
  />
</div>

export default DisplayPlaybook
