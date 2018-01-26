import React from 'react'
import ErrorIcon from 'material-ui/svg-icons/alert/error'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import { RetryButton } from 'components/elements/Buttons'

const ErrorMessage = (message, backgroundColor, time, actionForRetry) => <div>
  <Card
    className='incident-card'
    style={{ backgroundColor }}
  >
    <ErrorIcon />
    <CardHeader
      title={message}
      subtitle={time ? time.local().format('LTS') : 'Time unknown!'}
    />
    { actionForRetry ? <RetryButton actionForRetry={actionForRetry} /> : null }
  </Card>
</div>

export default ErrorMessage
