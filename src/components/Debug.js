import React from 'react'
import FlatButtonStyled from './elements/FlatButtonStyled'
import GetAuthContext from '../services/msalService'

export const Debug = () => {
    return (<div>
                <FlatButtonStyled
                    label='Clear Auth Cache'
                    onTouchTap={() => GetAuthContext().clearCache()}
                />
            </div>)
}

export default Debug