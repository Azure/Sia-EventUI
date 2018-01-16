import React from 'react'
import PropTypes from 'prop-types'
import Timeline from 'components/Timeline/Timeline'

export const IncidentEventsName = () => {
  return 'IncidentEvents'
}

export const IncidentEvents = (ticketToIncidentIdMap) => [
  [
    [
      (key) => <strong key={key}>
                Incident Timeline:
            </strong>
    ]
  ],
  [
    <Timeline
      ticketId={ticketToIncidentIdMap[0][0]}
      incidentId={ticketToIncidentIdMap[0][1]}
        />
  ]
]

IncidentEvents.propTypes = {
  ticketToIncidentIdMap: PropTypes.object
}
