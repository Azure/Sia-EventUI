import React from 'react'
import FlatButtonStyled from './elements/FlatButtonStyled'

export const Debug = ({authContext}) => {
    return (<FlatButtonStyled
                label='Clear Auth Cache'
                onTouchTap={authContext.clearCache()}
            />)
}

export default Debug