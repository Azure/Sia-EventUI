import React from 'react'
import NotificationsNone from 'material-ui/svg-icons/social/notifications-none'
import Notifications from 'material-ui/svg-icons/social/notifications'
import SyncProblem from 'material-ui/svg-icons/notification/sync-problem'
import SyncDisabled from 'material-ui/svg-icons/notification/sync-disabled'
import Sync from 'material-ui/svg-icons/notification/sync'
import IconButton from 'material-ui/IconButton'
import { connect } from 'react-redux'
import { connectionStatuses } from '../../reducers/signalRReducer'
import { resetSignalRConnection } from '../../services/signalRService'
import { acknowledgeMessages } from '../../actions/signalRActions'

export const NavNotifs = ({signalR, dispatch}) => {
    const pendingMessages = signalR.pendingMessages ? signalR.pendingMessages : 0
    return  <IconButton tooltip={showNotifsMessage(pendingMessages)}onTouchTap={notifsAction(signalR, dispatch)}>
                {displayButton(signalR)}
            </IconButton>
}

const showNotifsMessage = (pendingMessages) => {
    return pendingMessages === 0 ? 'Check for new messages' : `View ${pendingMessages} messages`
}

const notifsAction = (signalR, dispatch) => () => {
    if(signalR.connectionStatus === connectionStatuses.connected
    && signalR.pendingMessages) {
        dispatch(acknowledgeMessages())
    }
    else {
        resetSignalRConnection(dispatch)
    }
}

const displayButton = (signalR) => {
    switch(signalR.connectionStatus) {
        case connectionStatuses.connected:
            return signalR.pendingMessages ? <Notifications /> : <NotificationsNone />
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