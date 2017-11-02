import React from 'react'
import FlatButtonStyled from './elements/FlatButtonStyled'

export const Debug = ({authContext}) => {
    return (<div>
                <FlatButtonStyled
                    label='Clear Auth Cache'
                    onTouchTap={() => authContext.clearCache()}
                />
            </div>)
}

export default Debug