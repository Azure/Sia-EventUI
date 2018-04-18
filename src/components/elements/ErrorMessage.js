import React from 'react'
import { DateTime } from 'luxon'
import ErrorIcon from 'material-ui/svg-icons/alert/error'
import { Card, CardHeader } from 'material-ui/Card'
import { RetryButton } from 'components/elements/Buttons'

import timeFormattedToMultipleZones from 'helpers/timeFormattedToMultipleZones'

export const ErrorMessage = ({
  message,
  actionForRetry,
  time = null,
  backgroundColor = null
}) => {
  const errorMessageTime = time && time instanceof DateTime ? time.toLocal().toFormat(DateTime.TIME_WITH_SECONDS) : null

  return <Card
    className='incident-card'
    style={{ backgroundColor }}
  >
    <ErrorIcon />
    <CardHeader
      title={message}
      subtitle={timeFormattedToMultipleZones(errorMessageTime)}
    />
    { actionForRetry ? <RetryButton actionForRetry={actionForRetry} /> : null }
  </Card>
}

export default ErrorMessage
