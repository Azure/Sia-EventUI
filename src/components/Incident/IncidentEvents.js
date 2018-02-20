import React from 'react'
import PropTypes from 'prop-types'
import Timeline from 'components/Timeline/Timeline'

export const IncidentEventsName = () => {
  return 'IncidentEvents'
}

export const IncidentEvents = ({ticketId, incidentId}) =>
  <div>
    <div>
       <strong>Incident Timeline:</strong>
    </div>
    <div>
      <Timeline
        ticketId={ticketId}
        incidentId={incidentId}
      />
    </div>
  </div>

IncidentEvents.propTypes = {
  ticketId: PropTypes.number,
  incidentId: PropTypes.number
}

export default IncidentEvents