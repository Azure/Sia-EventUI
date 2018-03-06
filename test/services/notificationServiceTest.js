import { expect } from 'chai'
import * as service from 'services/notificationService'
import * as actions from 'actions/notificationActions'

/* eslint-disable no-unused-expressions */
describe('Chrome Extension Push Notifications Service', function () {
  const originalWindow = global.window
  const originalChrome = global.chrome

  after(function () {
    // Since we are messing with global objects we need to reset them back to the original
    // objects to avoid impacting other test suites.
    global.window = originalWindow
    global.chrome = originalChrome
  })

  beforeEach(function () {
    global.window = {}
    global.chrome = {}
  })

  context('when there is no chrome.extension object', function () {
    it('should not be considered a chrome extension', () => {
      const isChromeExtensionResult = service.isChromeExtension()
      expect(isChromeExtensionResult).to.be.false
    })
  })

  context('when running as a chrome extension', function () {
    beforeEach(function () {
      global.chrome = { extension: { getBackgroundPage: () => null } }
    })

    it('should be considered a chrome extension', () => {
      const isChromeExtensionResult = service.isChromeExtension()
      expect(isChromeExtensionResult).to.be.true
    })

    context('when running as a chrome extension background', function () {
      beforeEach(function () {
        global.chrome = {
          extension: { getBackgroundPage: () => global.window },
          browserAction: { setBadgeBackgroundColor: () => null },
          runtime: { onMessage: { addListener: () => null } },
          contextMenus: {
            onClicked: { addListener: () => null },
            create: () => null,
            removeAll: () => null
          },
          notifications: {
            onClicked: { addListener: () => null },
            onButtonClicked: { addListener: () => null },
            onClosed: { addListener: () => null }
          }
        }
      })

      it('should be considered a chrome extension background', () => {
        const isChromeExtensionBackgroundResult = service.isChromeExtensionBackground()
        expect(isChromeExtensionBackgroundResult).to.be.true
      })

      it('should not be considered a chrome extension popup', () => {
        const isChromeExtensionPopupResult = service.isChromeExtensionPopup()
        expect(isChromeExtensionPopupResult).to.be.false
      })

      it('should register chrome event listeners', () => {
        let runtimeOnMessageListenerAdded = false
        let contextMenusOnClickedListenerAdded = false
        let notificationsOnClickedListenerAdded = false
        let notificationsOnButtonClickedListenerAdded = false
        let notificationsOnClosedListenerAdded = false
        global.chrome.runtime.onMessage.addListener = () => { runtimeOnMessageListenerAdded = true }
        global.chrome.contextMenus.onClicked.addListener = () => { contextMenusOnClickedListenerAdded = true }
        global.chrome.notifications = {
          onClicked: { addListener: () => { notificationsOnClickedListenerAdded = true } },
          onButtonClicked: { addListener: () => { notificationsOnButtonClickedListenerAdded = true } },
          onClosed: { addListener: () => { notificationsOnClosedListenerAdded = true } }
        }

        service.configureNotificationService()

        expect(runtimeOnMessageListenerAdded).to.be.true
        expect(contextMenusOnClickedListenerAdded).to.be.true
        expect(notificationsOnClickedListenerAdded).to.be.true
        expect(notificationsOnButtonClickedListenerAdded).to.be.true
        expect(notificationsOnClosedListenerAdded).to.be.true
      })

      it('should create a context menu option to toggle receive push notifications', function () {
        const menuIdsResult = []
        global.chrome.contextMenus.create = (options) => { menuIdsResult.push(options.id) }
        service.configureNotificationService()
        expect(menuIdsResult).to.include(actions.TOGGLE_RECEIVE_PUSH_NOTIFICATIONS)
      })
    })

    context('when running as a chrome extension popup', function () {
      beforeEach(function () {
        global.chrome = { extension: { getBackgroundPage: () => {} } }
      })

      it('should be considered a chrome extension popup', () => {
        const isChromeExtensionPopupResult = service.isChromeExtensionPopup()
        expect(isChromeExtensionPopupResult).to.be.true
      })

      it('should not be considered a chrome extension background', () => {
        const isChromeExtensionBackgroundResult = service.isChromeExtensionBackground()
        expect(isChromeExtensionBackgroundResult).to.be.false
      })

      it('should send a popupOnLoad message', () => {
        let msgIdResults = []
        global.chrome.runtime = { sendMessage: msg => { msgIdResults.push(msg.messageId) } }
        service.configureNotificationService()
        expect(msgIdResults).to.include(service.extensionMessages.popupOnLoad)
      })
    })
  })
})
