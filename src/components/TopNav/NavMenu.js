import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import MenuItem from 'material-ui/MenuItem'
import IconMenu from 'material-ui/IconMenu'
import NavigationMenu from 'material-ui/svg-icons/navigation/menu'
import IconButton from 'material-ui/IconButton'
import ActionDeleteForever from 'material-ui/svg-icons/action/delete-forever'
import MenuLink from 'components/elements/MenuLink'
import { removeTicketFromRecent, removeAllTicketsFromRecent } from 'actions/ticketActions'
import * as auth from 'services/authNService'

const clearRecentTickets = (dispatch) =>
  <MenuItem key='clear' primaryText={'Clear Recent Tickets'} onClick={() => dispatch(removeAllTicketsFromRecent())}
    rightIcon={<ActionDeleteForever onClick={() => dispatch(removeAllTicketsFromRecent())}
  />}
  />

export const NavMenu = ({ dispatch, history, ticketIds }) => {
  return (<IconMenu
    iconButtonElement={<IconButton><NavigationMenu /></IconButton>}
    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
    targetOrigin={{horizontal: 'left', vertical: 'top'}}
  >
    <MenuItem key='search' primaryText={<Link to='/search' >Incident Search</Link>} />
    <MenuItem key='logout' primaryText={<Link to='/' onClick={() => dispatch(auth.logOut)}>LogOut</Link>} />
    {ticketIds && ticketIds.map(id => MenuLink('ticket', id, removeTicketFromRecent, dispatch)) }
    <MenuItem key='debug' primaryText={<Link to='/debug' >Debug</Link>} />
    { clearRecentTickets(dispatch) }
  </IconMenu>)
}

NavMenu.propTypes = {
  dispatch: PropTypes.func,
  ticketIds: PropTypes.array
}

export const mapStateToProps = (state, ownProps) => {
  var pathname = ownProps.location.pathname
  var currentId = /\d/.test(pathname) && pathname.match(/(\d+)/)[1]
  let idContainsANumberAndIsNotCurrent = (id) => id !== currentId && /\d/.test(id)

  return {
    ...ownProps,
    ticketIds: Object.entries(state.tickets.map)
      .filter(kvp => kvp[1] !== null)
      .map(kvp => kvp[0])
      .filter(idContainsANumberAndIsNotCurrent)
  }
}

export default withRouter(connect(mapStateToProps)(NavMenu))
