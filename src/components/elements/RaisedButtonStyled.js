import React from 'react'
import PropTypes from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton'

const styles = {
    raisedbutton: {
        fontSize: 12,
        minWidth: '10%',
        height: 28,
        textTransform: 'lowercase',
        padding: '1px'
    }
}

export const RaisedButtonStyled = ({label, type, primary, onTouchTap, children}) => {
    return (
        <RaisedButton
            label={label}
            type={type}
            labelStyle={styles.raisedbutton}
            style={styles.raisedbutton}
            primary={primary}
            onTouchTap={onTouchTap}
        >
            {children}
        </RaisedButton>
    )
}

RaisedButtonStyled.propTypes = {
    label: PropTypes.number,
    type: PropTypes.string,
    primary: PropTypes.bool,
    onTouchTap: PropTypes.func,
    children: PropTypes.string
}
export default RaisedButtonStyled