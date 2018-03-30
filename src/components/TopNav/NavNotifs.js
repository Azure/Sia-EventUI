import React from 'react'
import PropTypes from 'prop-types'
import NotificationsNone from 'material-ui/svg-icons/social/notifications-none'
import Notifications from 'material-ui/svg-icons/social/notifications'
import SyncProblem from 'material-ui/svg-icons/notification/sync-problem'
import SyncDisabled from 'material-ui/svg-icons/notification/sync-disabled'
import Sync from 'material-ui/svg-icons/notification/sync'
import Connecting from 'material-ui/svg-icons/notification/network-check'
import IconButton from 'material-ui/IconButton'
import { connect } from 'react-redux'
import { connectionStatuses } from 'reducers/signalRReducer'
import { resetSignalRConnection } from 'services/signalRService'
import { acknowledgeMessages } from 'actions/signalRActions'

export const NavNotifs = ({connection, messageStatus = {}, filterPreferences, dispatch}) => <IconButton
  tooltip={showNotifsMessage(messageStatus.pendingMessageCount)}
  onTouchTap={notifsAction(connection, messageStatus, dispatch)}
>
  {displayButton(connection, messageStatus.pendingMessageCount)}
</IconButton>

const showNotifsMessage = (pendingMessageCount = 0) => {
  return pendingMessageCount === 0 ? 'Check for new messages' : `View ${pendingMessageCount} messages`
}

NavNotifs.propTypes = {
  connection: PropTypes.object,
  messageStatus: PropTypes.object,
  filterPreferences: PropTypes.object,
  dispatch: PropTypes.func
}

const notifsAction = (connection, messageStatus, dispatch) => () => {
  if (connection.status === connectionStatuses.connected &&
    messageStatus.pendingMessageCount) {
    dispatch(acknowledgeMessages())
  } else {
    resetSignalRConnection(dispatch)
  }
}

const displayButton = (connection = {}, pendingMessageCount = 0) => {
  switch (connection.status) {
    case connectionStatuses.connected:
      return pendingMessageCount ? <Notifications /> : <NotificationsNone />
    case connectionStatuses.notEstablished:
      return <Sync />
    case connectionStatuses.disconnected:
      return <SyncDisabled />
    case connectionStatuses.connecting:
      return <Connecting />
    case connectionStatuses.error:
      return <SyncProblem />
    default:
      return <SyncProblem /> // Something unexpected has occurred
  }
}

const mapStateToProps = (state) => ({
  ...state.signalR
})

export default connect(mapStateToProps)(NavNotifs)
