import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import MenuItem from 'material-ui/MenuItem'
import ActionDelete from 'material-ui/svg-icons/action/delete'

export const MenuLink = (type, id, onClick, dispatch) => {
  var typeRoute = `/${type}s/${id}`
  return (
    <MenuItem
      key={`${type}-${id}`}
      containerElement={<Link to={typeRoute} />}
      primaryText={`${type} ${id}`}
      rightIcon={<ActionDelete onClick={() => dispatch(onClick(id))} />}
    />
  )
}

MenuLink.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired
}

export default MenuLink
