import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import MenuItem from 'material-ui/MenuItem'
import IconMenu from 'material-ui/IconMenu'
import NavigationMenu from 'material-ui/svg-icons/navigation/menu'
import IconButton from 'material-ui/IconButton'
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right'

import * as auth from 'services/authNService'
import Preferences from 'components/TopNav/Preferences'

var transformIdToTicketLink = (id, index) =>
  <MenuItem
    key={'ticket-' + id + '-index-' + index}
    primaryText={<Link to={'/tickets/' + id} >{'Ticket ' + id}</Link>}
  />

export const NavMenu = ({ dispatch, history, ticketIds, eventFilter, currentEventFilterType }) => {
  return (<IconMenu
    iconButtonElement={<IconButton><NavigationMenu /></IconButton>}
    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
    targetOrigin={{horizontal: 'left', vertical: 'top'}}
  >
    <MenuItem key='search' primaryText={<Link to='/search' >Incident Search</Link>} />
    <MenuItem key='logout' primaryText={<Link to='/' onClick={() => dispatch(auth.logOut)}>LogOut</Link>} />
    { ticketIds && ticketIds.map(transformIdToTicketLink) }
    <MenuItem key='debug' primaryText={<Link to='/debug' >Debug</Link>} />
    <MenuItem
      key='preferences'
      primaryText={'Preferences'}
      rightIcon={<ArrowDropRight />}
      menuItems={Preferences(eventFilter, currentEventFilterType, dispatch)}
    />
    <MenuItem key='load uncorrelated events' primaryText={<Link to='/events'>Events for All Incidents</Link>} />
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
    ticketIds: Object.keys(state.tickets.map).filter(idContainsANumberAndIsNotCurrent),
    eventFilter: state.events.filter,
    currentEventFilterType: state.signalR.filterPreferences.eventFilterType
  }
}

export default withRouter(connect(mapStateToProps)(NavMenu))
