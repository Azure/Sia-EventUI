import React from 'react'
import PropTypes from 'prop-types'

import Timeline from 'components/Timeline/Timeline'
import ApplyFilterOnMount from 'components/Timeline/Filter/ApplyFilterOnMount'

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
    <ApplyFilterOnMount>
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
