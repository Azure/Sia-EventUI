import React from 'react'
import FlatButtonStyled from './elements/FlatButtonStyled'

export const Debug = ({authContext, eventTypeActions, dispatch}) => {
    return (<div>
                <FlatButtonStyled
                    label='Clear Auth Cache'
                    onTouchTap={() => authContext.clearCache()}
                />
                <FlatButtonStyled
                    label='Playbook Operation Test'
                    onTouchTap={() => dispatch(eventTypeActions.fetchEventType(1))}
                />
            </div>)
}

export default Debug