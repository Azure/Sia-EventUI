import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import MenuItem from 'material-ui/MenuItem'
import ActionDelete from 'material-ui/svg-icons/action/delete'

export const MenuLink = (type, id, onClick, dispatch) => {
  validateType(type)
  var typeTitle = type.charAt(0).toUpperCase() + type.slice(1)
  var typeRoute = `/${type}s/${id}`
  return (
    <MenuItem
      key={`${type}-${id}`}
      primaryText={<Link to={typeRoute}>{`${typeTitle} ${id}`}</Link>}
      rightIcon={<ActionDelete onClick={() => dispatch(onClick(id))} />}
    />
  )
}

const validateType = (type) => {
  if (type === undefined || type === null || type.length < 2) { throw new Error('the type input is invalid') }
}

MenuLink.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired
}

export default MenuLink
