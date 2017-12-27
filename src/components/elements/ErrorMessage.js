import React from 'react'
import ErrorIcon from 'material-ui/svg-icons/alert/error'
import { RetryButton } from './Buttons'

const ErrorMessage = (message, actionForRetry) => <div>
        <ErrorIcon />
        <span>{message}</span>
        { actionForRetry ? <RetryButton actionForRetry={actionForRetry} /> : null }
    </div>

export default ErrorMessage