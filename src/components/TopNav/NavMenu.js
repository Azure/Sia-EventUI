import React from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider'
import IconMenu from 'material-ui/IconMenu'
import NavigationMenu from 'material-ui/svg-icons/navigation/menu'
import IconButton from 'material-ui/IconButton'
import ActionDelete from 'material-ui/svg-icons/action/delete'

import MenuLink from 'components/elements/MenuLink'
import { removeTicketFromRecent } from 'actions/ticketActions'
import * as auth from 'services/authNService'
import ClearRecentTickets from 'components/TopNav/ClearRecentTickets'

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
    {MenuLink('Incident Search', '/search')}
    {MenuLink('Events for All Incidents', '/events')}
    <Divider />
    {MenuLink('Preferences', '/preferences')}
    <Divider />
    <ClearRecentTickets />
    {ticketIds && ticketIds.map(id => MenuLink(`Ticket ${id}`, `/tickets/${id}`, <ActionDelete onClick={() => dispatch(removeTicketFromRecent(id))} />)) }
    <Divider />
    <MenuItem onClick={() => dispatch(auth.logOut)} primaryText='LogOut' />
    {MenuLink('Debug', '/debug')}
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
