'use strict'
import { expect } from 'chai'
import React from 'react'
import NotificationsNone from 'material-ui/svg-icons/social/notifications-none'
import Notifications from 'material-ui/svg-icons/social/notifications'
import SyncProblem from 'material-ui/svg-icons/notification/sync-problem'
import SyncDisabled from 'material-ui/svg-icons/notification/sync-disabled'
import Sync from 'material-ui/svg-icons/notification/sync'
import IconButton from 'material-ui/IconButton'
import Connecting from 'material-ui/svg-icons/notification/network-check'

import createComponent from 'test/helpers/shallowRenderHelper'
import { NavNotifs } from 'components/TopNav/NavNotifs'
import { connectionStatuses } from 'reducers/signalRReducer'

function mockDispatch (object) { }

const testSignalRConnectedWithMessages = {
  connection: {
    status: connectionStatuses.connected
  },
  messageStatus: {
    pendingMessageCount: 1
  }
}

const testSignalRConnectedNoMessages = {
  connection: {
    status: connectionStatuses.connected
  },
  messageStatus: {
    pendingMessageCount: 0
  }
}

const testSignalR = (status) => ({
  connection: {
    status
  }
})

const setup = (signalR, dispatch) => createComponent(NavNotifs, {...signalR, dispatch})

describe('NavNotifs', function () {
  describe('IconOutput', function () {
    describe('When connection status is Connected', function () {
      describe('When more than 0 messages are pending', function () {
        const result = setup(testSignalRConnectedWithMessages)

        it('Should return an IconButton component', function () {
          expect(result.type).to.equal(IconButton)
        })

        it('Should return a component with a child Notifications icon', function () {
          expect(result.props.children.type).to.equal(Notifications)
        })
      })

      describe('When 0 messages are pending', function () {
        const result = setup(testSignalRConnectedNoMessages)

        it('Should return an IconButton component', function () {
          expect(result.type).to.equal(IconButton)
        })

        it('Should return a component with a child NotificationsNone icon', function () {
          expect(result.props.children.type).to.equal(NotificationsNone)
        })
      })
    })

    describe('When connection status is notEstablished', function () {
      const result = setup(testSignalR(connectionStatuses.notEstablished))

      it('Should return an IconButton component', function () {
        expect(result.type).to.equal(IconButton)
      })

      it('Should return a component with a child Sync icon', function () {
        expect(result.props.children.type).to.equal(Sync)
      })
    })

    describe('When connection status is disconnected', function () {
      const result = setup(testSignalR(connectionStatuses.disconnected))

      it('Should return an IconButton component', function () {
        expect(result.type).to.equal(IconButton)
      })

      it('Should return a component with a child SyncDisabled icon', function () {
        expect(result.props.children.type).to.equal(SyncDisabled)
      })
    })

    describe('When connection status is error', function () {
      const result = setup(testSignalR(connectionStatuses.error))

      it('Should return an IconButton component', function () {
        expect(result.type).to.equal(IconButton)
      })

      it('Should return a component with a child SyncProblem icon', function () {
        expect(result.props.children.type).to.equal(SyncProblem)
      })
    })

    describe('When connection status is connecting', function () {
      const result = setup(testSignalR(connectionStatuses.connecting))

      it('Should return an IconButton component', function () {
        expect(result.type).to.equal(IconButton)
      })

      it('Should return a component with a child SyncProblem icon', function () {
        expect(result.props.children.type).to.equal(Connecting)
      })
    })

    describe('When connection status is not a predefined status', function () {
      const result = setup(testSignalR('IGNORE_ME'))

      it('Should return an IconButton component', function () {
        expect(result.type).to.equal(IconButton)
      })

      it('Should return a component with a child SyncProblem icon', function () {
        expect(result.props.children.type).to.equal(SyncProblem)
      })
    })
  })
})
