import React from 'react'
import IconButton from 'material-ui/IconButton'

const styles = {
    iconbutton: {
        width: 18,
        height: 18,
        padding: 0
    }
}

export const IconButtonStyled = ({tooltip, onTouchTap, children}) => {
    return (
        <IconButton
            tooltip={tooltip}
            iconStyle={styles.iconbutton}
            style={styles.iconbutton}
            onTouchTap={onTouchTap}
        >
            {children}
        </IconButton>
    )
}

export default IconButtonStyled
