import React from 'react'
import { Card, CardHeader, CardText } from 'material-ui/Card'

import AddEvent from 'components/Timeline/AddEvent'

export const AddEventCard = (incidentId) => <Card>
  <CardHeader title={'Add Event'} />

  <CardText>
    <AddEvent incidentId={incidentId} />
  </CardText>
</Card>

export default AddEventCard
