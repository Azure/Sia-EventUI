import React from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import MenuItem from 'material-ui/MenuItem'
import IconMenu from 'material-ui/IconMenu'
import { Link } from 'react-router-dom'
import NavigationMenu from 'material-ui/svg-icons/navigation/menu'
import IconButton from 'material-ui/IconButton'
import * as auth from 'services/authNService'
import { _ } from 'underscore'

var transformIdToTicketLink = (id, index) =>
  <MenuItem
    key={'ticket-' + id + "-index-" + index}
    primaryText={<Link to={'/tickets/' + id} >{"Ticket " + id}</Link>}
  />

export const NavMenu = ({ dispatch, history,  ticketIds }) => {
  return (<IconMenu
    iconButtonElement={<IconButton><NavigationMenu /></IconButton>}
    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
    targetOrigin={{horizontal: 'left', vertical: 'top'}}
  >
    <MenuItem key='search' primaryText={<Link to='/search' >Incident Search</Link>} />
    <MenuItem key='logout' primaryText={<Link to='/' onClick={ () => dispatch(auth.logOut)}>LogOut</Link> } />
    { ticketIds.map(transformIdToTicketLink) }
    <MenuItem key='debug' primaryText={<Link to='/debug' >Debug</Link>} />
  </IconMenu>)
}

NavMenu.propTypes = {
  dispatch: PropTypes.func,
  ticketIds: PropTypes.array
}

const mapStateToProps = (state, ownProps) => {
  var pathname  = ownProps.location.pathname
  var currentId = /\d/.test(pathname) && pathname.match(/(\d+)/)[1]
  return {
    ...ownProps,
    ticketIds: Object.keys(state.tickets.map).filter(id => id !== currentId)
  }
}

export default withRouter(connect(mapStateToProps)(NavMenu))
