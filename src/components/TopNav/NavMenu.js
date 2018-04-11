import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider'
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

export const NavMenu = ({
  dispatch,
  history,
  ticketIds
}) => {
  return (<IconMenu
    iconButtonElement={<IconButton><NavigationMenu /></IconButton>}
    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
    targetOrigin={{horizontal: 'left', vertical: 'top'}}
  >
    <MenuItem containerElement={<Link to='/search' />} primaryText='Incident Search' />
    <MenuItem containerElement={<Link to='/events' />} primaryText='Events for All Incidents' />
    <Divider />
    <MenuItem containerElement={<Link to='/preferences' />} primaryText={'Preferences'} />
    <Divider />
    { clearRecentTickets(dispatch) }
    {ticketIds && ticketIds.map(id => MenuLink('ticket', id, removeTicketFromRecent, dispatch)) }
    <Divider />
    <MenuItem onClick={() => dispatch(auth.logOut)} primaryText='LogOut' />
    <MenuItem containerElement={<Link to='/debug' />} primaryText='Debug' />
  </IconMenu>)
}

NavMenu.propTypes = {
  dispatch: PropTypes.func,
  ticketIds: PropTypes.array
}

export const mapStateToProps = (state, ownProps) => {
  const pathname = ownProps.location.pathname
  const currentId = /\d/.test(pathname) && pathname.match(/(\d+)/)[1]
  const idContainsANumberAndIsNotCurrent = (id) => id !== currentId && /\d/.test(id)

  return {
    history: ownProps.history,
    ticketIds: Object.entries(state.tickets.map)
      .filter(kvp => kvp[1] !== null)
      .map(kvp => kvp[0])
      .filter(idContainsANumberAndIsNotCurrent)
  }
}

export default withRouter(connect(mapStateToProps)(NavMenu))
