import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import MenuItem from 'material-ui/MenuItem'

export const MenuLink = (
  primaryText,
  route,
  rightIcon
) => <MenuItem
  key={primaryText + route}
  containerElement={<Link to={route} />}
  primaryText={primaryText}
  rightIcon={rightIcon}
/>

MenuLink.propTypes = {
  primaryText: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
  rightIcon: PropTypes.object
}

export default MenuLink
