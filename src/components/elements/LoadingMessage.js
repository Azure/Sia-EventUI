import React from 'react'
import CircularProgress from 'material-ui/CircularProgress'
import { RetryButton } from './Buttons'

const LoadingMessage = (message, actionForRetry) => <div>
        <CircularProgress />
        <span>{message}</span>
        { actionForRetry ? <RetryButton actionForRetry={actionForRetry} /> : null }
    </div>

export default LoadingMessage
