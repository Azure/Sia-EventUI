import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import MenuItem from 'material-ui/MenuItem'
import ActionDelete from 'material-ui/svg-icons/action/delete'
import { removeTicketFromRecent } from 'actions/ticketActions'
import { persistor } from '../../configureStore'

const MenuLink = (type, id, onClick, dispatch) => {
  var typeTitle = type.charAt(0).toUpperCase() + type.slice(1)
  var typeRoute = `/${ type }s/${ id }`
  return (
    <MenuItem
      key={`${type}-${id}` }
      primaryText={<Link to={typeRoute} >{`${typeTitle} ${id}`}</Link>}
      rightIcon={<ActionDelete
        onClick={
          () => {
            dispatch(onClick(id))
            persistor.purge()
            }
        } 
      />}
    />
  )
}

export default MenuLink