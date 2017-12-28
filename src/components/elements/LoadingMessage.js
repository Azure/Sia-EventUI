import React from 'react'
import PropTypes from 'prop-types'
import CircularProgress from 'material-ui/CircularProgress'
import { RetryButton } from './Buttons'

const LoadingMessage = (message, actionForRetry) => <div>
        <CircularProgress />
        <span>{message}</span>
        { actionForRetry ? <RetryButton actionForRetry={actionForRetry} /> : null }
    </div>

LoadingMessage.propTypes = {
    message: PropTypes.string.isRequired,
    actionForRetry: PropTypes.func.isRequired
}

export default LoadingMessage
