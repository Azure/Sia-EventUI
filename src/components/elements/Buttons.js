import React from 'react'
import FlatButtonStyled from './FlatButtonStyled'
import { connect } from 'react-redux'

export const DisplayRetryButton = ({actionForRetry, dispatch}) => <FlatButtonStyled
    label='Retry'
    primary={true}
    onTouchTap={() => dispatch(actionForRetry)}
/>

const MapStateToPropsRetryButton = (state, ownProps) => ({
    ...ownProps
}) //We just want to add dispatch

export const RetryButton = connect(MapStateToPropsRetryButton)(DisplayRetryButton)
