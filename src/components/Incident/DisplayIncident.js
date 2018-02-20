import React from 'react'

import CollapsibleGridSet from 'components/elements/CollapsibleGrid'
import { IncidentSummaryName } from 'components/Incident/IncidentSummary'
import { IncidentEventsName } from 'components/Incident/IncidentEvents'
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

export default DisplayIncident
