import React from 'react'
import PropTypes from 'prop-types'
import NotificationsNone from 'material-ui/svg-icons/social/notifications-none'
import Notifications from 'material-ui/svg-icons/social/notifications'
import SyncProblem from 'material-ui/svg-icons/notification/sync-problem'
import SyncDisabled from 'material-ui/svg-icons/notification/sync-disabled'
import Sync from 'material-ui/svg-icons/notification/sync'
import IconButton from 'material-ui/IconButton'
import { connect } from 'react-redux'
import { connectionStatuses } from 'reducers/signalRReducer'
import { resetSignalRConnection } from 'services/signalRService'
import { acknowledgeMessages } from 'actions/signalRActions'

export const NavNotifs = ({signalR, dispatch}) => {
  const pendingMessageCount = signalR.pendingMessageCount ? signalR.pendingMessageCount : 0
  return <IconButton tooltip={showNotifsMessage(pendingMessageCount)}onTouchTap={notifsAction(signalR, dispatch)}>
    {displayButton(signalR)}
  </IconButton>
}

const showNotifsMessage = (pendingMessageCount) => {
  return pendingMessageCount === 0 ? 'Check for new messages' : `View ${pendingMessageCount} messages`
}

NavNotifs.propTypes = {
  signalR: PropTypes.object,
  dispatch: PropTypes.func
}

const notifsAction = (signalR, dispatch) => () => {
  if (signalR.connectionStatus === connectionStatuses.connected &&
    signalR.pendingMessageCount) {
    dispatch(acknowledgeMessages())
  } else {
    resetSignalRConnection(dispatch)
  }
}

const displayButton = (signalR) => {
  switch (signalR.connectionStatus) {
    case connectionStatuses.connected:
      return signalR.pendingMessageCount ? <Notifications /> : <NotificationsNone />
    case connectionStatuses.notEstablished:
      return <Sync />
    case connectionStatuses.disconnected:
      return <SyncDisabled />
    case connectionStatuses.error:
      return <SyncProblem />
  }
}

const mapStateToProps = (state) => ({
  signalR: state.signalR
})

export default connect(mapStateToProps)(NavNotifs)
