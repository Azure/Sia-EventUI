import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider'
import IconMenu from 'material-ui/IconMenu'
import NavigationMenu from 'material-ui/svg-icons/navigation/menu'
import IconButton from 'material-ui/IconButton'
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right'

import MenuLink from 'components/elements/MenuLink'
import { removeTicketFromRecent } from 'actions/ticketActions'
import * as auth from 'services/authNService'
import Preferences from 'components/TopNav/Preferences'
import ClearRecentTickets from 'components/TopNav/ClearRecentTickets'

export const NavMenu = ({ dispatch, history, ticketIds, eventFilter, currentEventFilterType }) => {
  return (<IconMenu
    iconButtonElement={<IconButton><NavigationMenu /></IconButton>}
    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
    targetOrigin={{horizontal: 'left', vertical: 'top'}}
  >
    <MenuItem containerElement={<Link to='/search' />} primaryText='Incident Search' />
    <MenuItem containerElement={<Link to='/events' />} primaryText='Events for All Incidents' />
    <Divider />
    <MenuItem
      key='preferences'
      primaryText={'Preferences'}
      rightIcon={<ArrowDropRight />}
      menuItems={Preferences(eventFilter, currentEventFilterType, dispatch)}
    />
    <Divider />
    <ClearRecentTickets />
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
  var pathname = ownProps.location.pathname
  var currentId = /\d/.test(pathname) && pathname.match(/(\d+)/)[1]
  let idContainsANumberAndIsNotCurrent = (id) => id !== currentId && /\d/.test(id)

  return {
    ...ownProps,
    eventFilter: state.events.filter,
    currentEventFilterType: state.signalR.filterPreferences.eventFilterType,
    ticketIds: Object.entries(state.tickets.map)
      .filter(kvp => kvp[1] !== null)
      .map(kvp => kvp[0])
      .filter(idContainsANumberAndIsNotCurrent)
  }
}

export default withRouter(connect(mapStateToProps)(NavMenu))
