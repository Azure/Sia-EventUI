import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import MenuItem from 'material-ui/MenuItem'
import ActionDeleteForever from 'material-ui/svg-icons/action/delete-forever'

import { removePreviousTicketsFromRecent } from 'actions/ticketActions'

export const clearRecentTicketsButtonAction = (dispatch, currentTicketId) =>
  () => dispatch(removePreviousTicketsFromRecent(currentTicketId))

export const ClearRecentTicketsButton = ({dispatch, currentTicketId, clearRecentTickets}) => <MenuItem
  key='clear'
  primaryText={'Clear Recent Tickets'}
  onClick={clearRecentTickets(dispatch, currentTicketId)}
  rightIcon={<ActionDeleteForever onClick={clearRecentTickets(dispatch, currentTicketId)} />}
/>

export const mapStateToClearRecentTicketsProps = (_, ownProps) => ({
  currentTicketId: ownProps.match.params.ticketId,
  clearRecentTickets: clearRecentTicketsButtonAction
})

export const ConnectedClearRecentTicketsButton = connect(mapStateToClearRecentTicketsProps)(ClearRecentTicketsButton)

export const ClearRecentTickets = () => <Switch>
  <Route
    path='/tickets/:ticketId'
    component={ConnectedClearRecentTicketsButton}
  />
  <Route
    path='/'
    component={ConnectedClearRecentTicketsButton}
  />
</Switch>

export default ClearRecentTickets
