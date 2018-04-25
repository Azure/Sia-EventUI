import React from 'react'
import ErrorIcon from 'material-ui/svg-icons/alert/error'
import { Card, CardHeader } from 'material-ui/Card'
import { RetryButton } from 'components/elements/Buttons'
import TimeDisplay from 'components/elements/TimeDisplay'

export const ErrorMessage = ({
  message,
  actionForRetry,
  time = null,
  backgroundColor = null
}) => {
  return <Card
    className='incident-card'
    style={{ backgroundColor }}
  >
    <ErrorIcon />
    <CardHeader
      title={message}
      subtitle={<TimeDisplay time={time} />}
    />
    { actionForRetry ? <RetryButton actionForRetry={actionForRetry} /> : null }
  </Card>
}

export default ErrorMessage
