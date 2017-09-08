import React from 'react'
import FlatButton from 'material-ui/FlatButton'

const styles = {
    flatbutton: {
        fontSize: 12,
        minWidth: '12%',
        height: 20,
        margin: 2,
        textTransform: 'capitalize',
        position: 'relative',
        top: -8
    }
}

export const FlatButtonStyled = ({label, primary, keyboardFocused, onTouchTap}) => {
    return (
        <FlatButton
            label={label}
            labelStyle={styles.flatbutton}
            style={styles.flatbutton}
            primary={primary}
            //secondary={!primary}
            keyboardFocused={keyboardFocused}
            onTouchTap={onTouchTap}
        >
        </FlatButton>
    )
}

export default FlatButtonStyled