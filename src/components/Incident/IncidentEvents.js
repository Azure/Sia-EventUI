import React from 'react'
import PropTypes from 'prop-types'


import Passthrough from 'components/elements/Passthrough'

export const IncidentEventsName = () => {
  return 'IncidentEvents'
}

export const IncidentEvents = Passthrough

IncidentEvents.propTypes = {
  ticketId: PropTypes.number,
  incidentId: PropTypes.number
}

export const TimelineTitle = () => <div>
  <strong>Incident Timeline:</strong>
</div>


export default IncidentEvents