import { expect } from 'chai'
import * as reducer from 'reducers/notificationReducer'
import * as actions from 'actions/notificationActions'

/* eslint-disable no-unused-expressions */
describe('Chrome Extension Push Notifications Reducer', function () {
  describe('Notification Options Reducer', function () {
    it('should enable and disable the receivePushNotificationsEnabled flag', function () {
      const result = reducer.notificationOptionsReducer(undefined, {
        type: actions.TOGGLE_RECEIVE_PUSH_NOTIFICATIONS,
        enable: true
      })
      const result2 = reducer.notificationOptionsReducer(undefined, {
        type: actions.TOGGLE_RECEIVE_PUSH_NOTIFICATIONS,
        enable: false
      })

      const result3 = reducer.notificationOptionsReducer({ receivePushNotificationsEnabled: true }, {
        type: actions.TOGGLE_RECEIVE_PUSH_NOTIFICATIONS,
        enable: false
      })

      expect(result.receivePushNotificationsEnabled).to.be.true
      expect(result2.receivePushNotificationsEnabled).to.be.false
      expect(result3.receivePushNotificationsEnabled).to.be.false
    })
  })

  describe('Unread Notification Count Reducer', function () {
    it('should increment unreadNotificationCount by one with every notification emitted', function () {
      const action = { type: actions.EMIT_NOTIFICATION }
      const result1 = reducer.unreadNotificationCountReducer(undefined, action)
      const result2 = reducer.unreadNotificationCountReducer(7, action)
      expect(result1).to.equal(1)
      expect(result2).to.equal(8)
    })

    it('should reset to zero when notifications are read', function () {
      const action = { type: actions.NOTIFICATIONS_READ }
      const result1 = reducer.unreadNotificationCountReducer(undefined, action)
      const result2 = reducer.unreadNotificationCountReducer(7, action)
      expect(result1).to.equal(0)
      expect(result2).to.equal(0)
    })
  })

  describe('Notification List Reducer', function () {
    context('when emit is invoked', function () {
      it('should add the notification to the list', function () {
        const notification = {}
        const action = { type: actions.EMIT_NOTIFICATION, notification }
        const resultList1 = reducer.notificationListReducer(undefined, action)
        const resultList2 = reducer.notificationListReducer([{}, {}, {}], action)
        expect(resultList1).to.contain(notification)
        expect(resultList1).to.have.lengthOf(1)
        expect(resultList2).to.contain(notification)
        expect(resultList2).to.have.lengthOf(4)
      })
    })

    context('when notification emitted', function () {
      it('should add the notification id', function () {
        const notification1 = { event: {id: 'Event1'} }
        const notification2 = { event: {id: 'Event2'} }
        const action = {
          type: actions.NOTIFICATION_EMITTED,
          eventId: notification1.event.id,
          notificationId: 'Notification1'
        }
        const resultList = reducer.notificationListReducer([notification1, notification2], action)
        const resultNotification1 = resultList.find(n => n.event.id === notification1.event.id)
        const resultNotification2 = resultList.find(n => n.event.id === notification2.event.id)
        expect(resultNotification1.notificationId).to.equal(action.notificationId)
        expect(resultNotification2.notificationId).to.be.undefined
      })

      it('should set isEmitted to true', function () {
        const notification1 = { event: {id: 'Event1'} }
        const notification2 = { event: {id: 'Event2'} }
        const action = {
          type: actions.NOTIFICATION_EMITTED,
          eventId: notification1.event.id
        }
        const resultList = reducer.notificationListReducer([notification1, notification2], action)
        const resultNotification1 = resultList.find(n => n.event.id === notification1.event.id)
        const resultNotification2 = resultList.find(n => n.event.id === notification2.event.id)
        expect(resultNotification1.isEmitted).to.be.true
        expect(resultNotification2.isEmitted).to.not.be.true
      })

      it('should add the action buttons', function () {
        const buttonActions = {}
        const notification1 = { event: {id: 'Event1'} }
        const notification2 = { event: {id: 'Event2'} }
        const action = {
          type: actions.NOTIFICATION_EMITTED,
          eventId: notification1.event.id,
          buttonActions
        }
        const resultList = reducer.notificationListReducer([notification1, notification2], action)
        const resultNotification1 = resultList.find(n => n.event.id === notification1.event.id)
        const resultNotification2 = resultList.find(n => n.event.id === notification2.event.id)
        expect(resultNotification1.buttonActions).to.equal(buttonActions)
        expect(resultNotification2.buttonActions).to.not.equal(buttonActions)
      })
    })

    context('when notification clicked', function () {
      it('should set isClicked to true', function () {
        const notification1 = { notificationId: 'Notification1' }
        const notification2 = { notificationId: 'Notification2' }
        const action = {
          type: actions.NOTIFICATION_CLICKED,
          notificationId: notification1.notificationId,
          buttonIndex: 0
        }
        const resultList = reducer.notificationListReducer([notification1, notification2], action)
        const resultNotification1 = resultList.find(n => n.notificationId === notification1.notificationId)
        const resultNotification2 = resultList.find(n => n.notificationId === notification2.notificationId)
        expect(resultNotification1.isClicked).to.be.true
        expect(resultNotification2.isClicked).to.not.be.true
      })

      it('should set the proper button index', function () {
        const notification1 = { notificationId: 'Notification1' }
        const notification2 = { notificationId: 'Notification2' }
        const action1 = {
          type: actions.NOTIFICATION_CLICKED,
          notificationId: notification1.notificationId,
          buttonIndex: 0
        }
        const action2 = {
          type: actions.NOTIFICATION_CLICKED,
          notificationId: notification2.notificationId,
          buttonIndex: 1
        }

        const resultList1 = reducer.notificationListReducer([notification1, notification2], action1)
        const resultList2 = reducer.notificationListReducer(resultList1, action2)

        const result1Notification1 = resultList1.find(n => n.notificationId === notification1.notificationId)
        const result1Notification2 = resultList1.find(n => n.notificationId === notification2.notificationId)
        const result2Notification1 = resultList2.find(n => n.notificationId === notification1.notificationId)
        const result2Notification2 = resultList2.find(n => n.notificationId === notification2.notificationId)
        expect(result1Notification1.buttonIndex).to.equal(action1.buttonIndex)
        expect(result1Notification2.buttonIndex).to.be.undefined
        expect(result2Notification1.buttonIndex).to.equal(action1.buttonIndex)
        expect(result2Notification2.buttonIndex).to.equal(action2.buttonIndex)
      })
    })

    context('when notification removed', function () {
      it('should be eliminated from the list', function () {
        const notification1 = { notificationId: 'Notification1' }
        const notification2 = { notificationId: 'Notification2' }
        const action = {
          type: actions.NOTIFICATION_REMOVED,
          notificationId: notification1.notificationId
        }
        const resultList = reducer.notificationListReducer([notification1, notification2], action)
        expect(resultList).to.not.contain(notification1)
        expect(resultList).to.contain(notification2)
        expect(resultList).to.have.lengthOf(1)
      })
    })
  })
})
