import React from 'react'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import AddEvent from './AddEvent'

export const AddEventCard = (incidentId) => <Card>
    <CardHeader
        title={'Add Event'}
        actAsExpander={true}
        showExpandableButton={true}
    />
    
    <CardText expandable={true}>
        <AddEvent incidentId={incidentId} />
    </CardText>
</Card>

export default AddEventCard

