import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import MenuItem from 'material-ui/MenuItem'
import IconMenu from 'material-ui/IconMenu'
import { Link } from 'react-router-dom'
import NavigationMenu from 'material-ui/svg-icons/navigation/menu'
import IconButton from 'material-ui/IconButton'
import * as auth from 'services/authNService'
import { _ } from 'underscore'

const Tickets = () => {
  var persistedTickets  = JSON.parse(localStorage['persist:ticket'])
  var currentTicketId   = window.location.pathname.match(/(\d+)/)[1]

  var idIsNumericalAndNotCurrentTicket  = (id) => /\d+/.test(id) && id != currentTicketId
  var addCurrentPageToHistory           = () => { history.push(this.to) }
  var transformIdToTicketLink           = (id) =>
    <MenuItem
      key={'ticket-' + id}
      primaryText={
        <Link
          to={'/tickets/' + id}
          onClick={ addCurrentPageToHistory }>
          Ticket {id}
        </Link>
      }
    />

  var ticketIds = _.select(Object.keys(persistedTickets), idIsNumericalAndNotCurrentTicket)

  return ticketIds.map(transformIdToTicketLink)
}

export const NavMenu = (dispatch) => {
  return (<IconMenu
    iconButtonElement={<IconButton><NavigationMenu /></IconButton>}
    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
    targetOrigin={{horizontal: 'left', vertical: 'top'}}
  >
    <MenuItem key='search' primaryText={<Link to='/search' >Incident Search</Link>} />
    <MenuItem key='logout' primaryText={<Link to='/' onClick={ () => dispatch(auth.logOut)}>LogOut</Link> } />

    { Tickets() }
    <MenuItem key='debug' primaryText={<Link to='/debug' >Debug</Link>} />
  </IconMenu>)
}

NavMenu.propTypes = {
  dispatch: PropTypes.func
}
export default connect()(NavMenu)
