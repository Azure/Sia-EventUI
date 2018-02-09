import React from 'react'
import { DateTime } from 'luxon'
import ErrorIcon from 'material-ui/svg-icons/alert/error'
import { Card, CardHeader } from 'material-ui/Card'
import { RetryButton } from 'components/elements/Buttons'

const ErrorMessage = (message, actionForRetry, time = null, backgroundColor = null) => {
  const errorMessageTime = time && time instanceof DateTime ? time.toLocal().toFormat(DateTime.TIME_WITH_SECONDS) : null

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
