import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import MenuItem from 'material-ui/MenuItem'
import ActionDeleteForever from 'material-ui/svg-icons/action/delete-forever'

import { removePreviousTicketsFromRecent } from 'actions/ticketActions'

export const clearRecentTicketsButtonAction = (dispatch, currentTicketId) =>
() => dispatch(removePreviousTicketsFromRecent(currentTicketId))

export const clearRecentTicketsButton = ({dispatch, currentTicketId}) => <MenuItem
  key='clear'
  primaryText={'Clear Recent Tickets'}
  onClick={clearRecentTicketsButtonAction(dispatch, currentTicketId)}
  rightIcon={<ActionDeleteForever onClick={clearRecentTicketsButtonAction(dispatch, currentTicketId)} />}
/>

const mapStateToClearRecentTicketsProps = (_, ownProps) => ({
  currentTicketId: ownProps.match.params.ticketId
})

const ConnectedButton = connect(mapStateToClearRecentTicketsProps)(clearRecentTicketsButton)

export const clearRecentTickets = () => <Switch>
  <Route
    path='/tickets/:ticketId'
    component={ConnectedButton}
  />
  <Route
    path='/'
    component={ConnectedButton}
  />
</Switch>

export default clearRecentTickets
