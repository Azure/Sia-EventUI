import React from 'react'
import Paper from 'material-ui/Paper'
import Checklist from 'components/Checklist'

// TODO: gigure out how to inject the ticketId in

const TicketChecklist = ({...props}) => <Paper className='standard-padding '>
    <Checklist initialProps={props} /> 
  </Paper>


export default TicketChecklist
