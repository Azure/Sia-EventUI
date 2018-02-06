import React from 'react'
import moment from 'moment'
import ErrorIcon from 'material-ui/svg-icons/alert/error'
import { Card, CardHeader } from 'material-ui/Card'
import { RetryButton } from 'components/elements/Buttons'

const ErrorMessage = (message, actionForRetry, time = null, backgroundColor = null) => {
  const errorMessageTime = time && time instanceof moment ? time.local().format('LTS') : null

  return <div>
    <Card
      className='incident-card'
      style={{ backgroundColor }}
    >
      <ErrorIcon />
      <CardHeader
        title={message}
        subtitle={errorMessageTime}
      />
      { actionForRetry ? <RetryButton actionForRetry={actionForRetry} /> : null }
    </Card>
  </div>
}

export default ErrorMessage
