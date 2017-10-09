'use strict'
import { expect } from 'chai'
import React from 'react'
import TestUtils from 'react-dom/test-utils'
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
    pendingMEssages: [{}]
}

const testSignalRConnectedNoMessages = {
    connectionStatus: connectionStatuses.connected,
    pendingMEssages: []
}

const testSignalR = (status) => ({
    connectionStatus: status,
})



function setup(testSignalR, mockDispatch) {
    let renderer = TestUtils.createRenderer()
    renderer.render(<NavNotifs signalR={testSignalR} dispatch={mockDispatch}/>)
    let output = renderer.getRenderOutput()
    return output
}



describe('NavNotifs', function test () {
    beforeEach( () => {
        this.testSignalRConnectedWithMessages = setup(testSignalRConnectedWithMessages)
        this.testSignalRConnectedNoMessages = setup(testSignalRConnectedNoMessages)
        this.testSignalRNotEstablished = setup(testSignalR(connectionStatuses.notEstablished))
        this.testSignalRDisconnecteds = setup(connectionStatuses.disconnected)
        this.testSignalRError = setup(connectionStatuses.error)
    })

    it('Should render an IconButton with correct child icon', () => {
        expect(this.testSignalRConnectedWithMessages.type).to.equal(IconButton)
        expect(this.testSignalRConnectedWithMessages.children.type).to.equal(Notifications)

        expect(this.testSignalRConnectedNoMessages.type).to.equal(IconButton)
        expect(this.testSignalRConnectedNoMessages.children.type).to.equal(NotificationsNone)

        expect(this.testSignalRNotEstablished.type).to.equal(IconButton)
        expect(this.testSignalRNotEstablished.children.type).to.equal(Sync)

        expect(this.testSignalRDisconnecteds.type).to.equal(IconButton)
        expect(this.testSignalRDisconnecteds.children.type).to.equal(SyncDisabled)

        expect(this.testSignalRError.type).to.equal(IconButton)
        expect(this.testSignalRError.children.type).to.equal(SyncProblem)
    })
})