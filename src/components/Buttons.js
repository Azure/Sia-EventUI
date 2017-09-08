import React from 'react'
import FlatButtonStyled from './elements/FlatButtonStyled'

export const RetryButton = ({actionForRetry, dispatch}) => <FlatButtonStyled
    label='Retry'
    primary={true}
    onTouchTap={() => dispatch(actionForRetry)}
/>