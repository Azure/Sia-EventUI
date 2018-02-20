import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import CollapsibleGridSet from 'components/elements/CollapsibleGrid'
import { IncidentSummary, IncidentSummaryName } from 'components/Incident/IncidentSummary'
import { IncidentEvents, IncidentEventsName } from 'components/Incident/IncidentEvents'
import PassPropsToChildren from 'components/elements/helpers/PassPropsToChildren'

export const DisplayIncident = ({children, ...props}) => <CollapsibleGridSet
  containerClass={'incident-container'}
  rowClass={'incident-row'}
  columnClass={'incident-col'}
  collapseNames={[
    IncidentSummaryName(),
    IncidentEventsName()
  ]}
>
  {PassPropsToChildren(children, props)}
</CollapsibleGridSet>


/*[
    IncidentSummary({incident, ticket, ticketSystem, ticketOriginId: ticket.originId, dispatch}),
    IncidentEvents([[ticket.originId, incident.id]])
  ]*/



export default DisplayIncident
