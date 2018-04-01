import React from 'react'
import PropTypes from 'prop-types'

import ApplyFilterOnMount from 'components/Timeline/Filter/ApplyFilterOnMount'
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
    <ApplyFilterOnMount incidentId={ticketToIncidentIdMap[0][1]}>
      <Timeline
        ticketId={ticketToIncidentIdMap[0][0]}
        incidentId={ticketToIncidentIdMap[0][1]}
      />
    </ApplyFilterOnMount>
  ]
]

IncidentEvents.propTypes = {
  ticketToIncidentIdMap: PropTypes.object
}
