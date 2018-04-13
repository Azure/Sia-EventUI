import React from 'react'
import PropTypes from 'prop-types'
import FlatButton from 'material-ui/FlatButton'

const styles = {
  flatbutton: {}
}

export const FlatButtonStyled = (props) => {
  return (
    <FlatButton {...props} style={styles.flatbutton} />
  )
}

FlatButtonStyled.propTypes = {
  label: PropTypes.string.isRequired,
  primary: PropTypes.bool,
  keyboardFocused: PropTypes.string,
  onTouchTap: PropTypes.func.isRequired
}

export default FlatButtonStyled
