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
  ticketInfo
}) => {
  return (<IconMenu
    iconButtonElement={<IconButton><NavigationMenu /></IconButton>}
    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
    targetOrigin={{horizontal: 'left', vertical: 'top'}}
  >
    <MenuLink primaryText={'Incident Search'} route={'/search'} />
    <MenuLink primaryText={'Events for All Incidents'} route={'/events'} />
    <Divider />
    <MenuLink primaryText={'Preferences'} route={'/preferences'} />
    <Divider />
    <ClearRecentTickets />
    { ticketMenuLinks(ticketInfo, dispatch) }
    <Divider />
    <MenuItem onClick={() => dispatch(auth.logOut)} primaryText='LogOut' />
    <MenuLink primaryText={'Debug'} route={'/debug'} />
  </IconMenu>)
}

export const ticketMenuLinks = (ticketInfo, dispatch) =>
  ticketInfo &&
  ticketInfo.map(({id, title}) => {
    const ticketTitle = `${id} ${title ? '-' : ''} ${title}`

    return <MenuLink
      key={id}
      route={`/tickets/${id}`}
      primaryText={ticketTitle}
      rightIcon={<ActionDelete onClick={() => dispatch(removeTicketFromRecent(id))} />}
    />
  })

const ticketTitle = (ticket) =>
  ticket && ticket.data && ticket.data.title
    ? ticket.data.title
    : ''

NavMenu.propTypes = {
  dispatch: PropTypes.func,
  ticketInfo: PropTypes.array
}

export const mapStateToProps = (state, ownProps) => {
  const pathname = ownProps.location.pathname
  const currentId = /\d/.test(pathname) && pathname.match(/(\d+)/)[1]
  const entryBelongsInHistory = (kvp) =>
    kvp[1] !== null &&
    kvp[0] !== currentId &&
    /\d/.test(kvp[0])

  return {
    history: ownProps.history,
    ticketInfo: Object.entries(state.tickets.map)
      .filter(entryBelongsInHistory)
      .map(kvp => { return { id: kvp[0], title: ticketTitle(kvp[1]) } })
  }
}

export default withRouter(connect(mapStateToProps)(NavMenu))
