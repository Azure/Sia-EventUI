import React from 'react'
import { Link } from 'react-router-dom'
import MenuItem from 'material-ui/MenuItem'
import ActionDelete from 'material-ui/svg-icons/action/delete'

export const MenuLink = (type, id, onClick, dispatch) => {
  var typeTitle = makeTitle(type)
  var typeRoute = makeRoute(type, id)
  return (
    <MenuItem
      key={makeKey(type, id)}
      primaryText={<Link to={typeRoute} >{`${typeTitle} ${id}`}</Link>}
      rightIcon={<ActionDelete onClick={ () => dispatch(onClick(id)) } />}
    />
  )
}

const menuItemOnClick = (onClick, dispatch, id) => {
  dispatch(onClick(id))
}

const makeTitle = (type) => {
  return type.charAt(0).toUpperCase() + type.slice(1)
}

const makeRoute = (type, id) => {
  return `/${ type }s/${ id }`
}

const makeKey = (type, id) => {
  return `${type}-${id}`
}

export default MenuLink
