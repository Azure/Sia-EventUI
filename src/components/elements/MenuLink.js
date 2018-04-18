import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import MenuItem from 'material-ui/MenuItem'

const styles = {
  constrainedWidth: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: '25rem'
  }
}

export const MenuLink = ({primaryText, route, onClick, rightIcon}) => {
  return (
    <MenuItem
      key={primaryText + route}
      containerElement={<Link to={route} />}
      primaryText={<div style={styles.constrainedWidth}>{primaryText}</div>}
      onClick={onClick}
      rightIcon={rightIcon}
      title={primaryText}
    />
  )
}

MenuLink.propTypes = {
  primaryText: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
  rightIcon: PropTypes.object
}

export default MenuLink
