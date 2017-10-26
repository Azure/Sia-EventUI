'use strict'
import { expect } from 'chai'
import React from 'react'
import createComponent from '../../helpers/shallowRenderHelper'
import { NavNotifs } from '../../../src/components/TopNav/NavNotifs'
import { connectionStatuses } from '../../../src/reducers/signalRReducer'
import NotificationsNone from 'material-ui/svg-icons/social/notifications-none'
import Notifications from 'material-ui/svg-icons/social/notifications'
import SyncProblem from 'material-ui/svg-icons/notification/sync-problem'
import SyncDisabled from 'material-ui/svg-icons/notification/sync-disabled'
import Sync from 'material-ui/svg-icons/notification/sync'
import IconButton from 'material-ui/IconButton'

function mockDispatch (object) { }

const testSignalRConnectedWithMessages = {
    connectionStatus: connectionStatuses.connected,
    pendingMessages: [{}]
}

const testSignalRConnectedNoMessages = {
    connectionStatus: connectionStatuses.connected,
    pendingMessages: null
}

const testSignalR = (status) => ({
    connectionStatus: status
})



const setup = (signalR, dispatch) => createComponent(NavNotifs, {signalR, dispatch})


describe('NavNotifs', function test () {
    beforeEach( () => {
        this.testSignalRConnectedWithMessages = setup(testSignalRConnectedWithMessages)
        this.testSignalRConnectedNoMessages = setup(testSignalRConnectedNoMessages)
        this.testSignalRNotEstablished = setup(testSignalR(connectionStatuses.notEstablished))
        this.testSignalRDisconnecteds = setup(testSignalR(connectionStatuses.disconnected))
        this.testSignalRError = setup(testSignalR(connectionStatuses.error))
    })

    it('Should render an IconButton with correct child icon', () => {
        expect(this.testSignalRConnectedWithMessages.type).to.equal(IconButton)
        expect(this.testSignalRConnectedWithMessages.props.children.type).to.equal(Notifications)

        expect(this.testSignalRConnectedNoMessages.type).to.equal(IconButton)
        expect(this.testSignalRConnectedNoMessages.props.children.type).to.equal(NotificationsNone)

        expect(this.testSignalRNotEstablished.type).to.equal(IconButton)
        expect(this.testSignalRNotEstablished.props.children.type).to.equal(Sync)

        expect(this.testSignalRDisconnecteds.type).to.equal(IconButton)
        expect(this.testSignalRDisconnecteds.props.children.type).to.equal(SyncDisabled)

        expect(this.testSignalRError.type).to.equal(IconButton)
        expect(this.testSignalRError.props.children.type).to.equal(SyncProblem)
    })
})
