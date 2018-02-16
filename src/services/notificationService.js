import * as actions from 'actions/notificationActions'

export const extensionMessages = {
  popupOnLoad: 'SIA_EXTENSION_POPUP_ON_LOAD'
}

export const isChromeExtension = () => typeof chrome !== 'undefined' &&
                                       typeof window !== 'undefined' &&
                                       chrome.extension != null &&
                                       chrome.extension.getBackgroundPage != null

export const isChromeExtensionBackground = () => isChromeExtension() &&
                                                 chrome.extension.getBackgroundPage() === window

export const isChromeExtensionPopup = () => isChromeExtension() &&
                                            chrome.extension.getBackgroundPage() !== window

export const configureNotificationService = (dispatch) => {
  if (isChromeExtensionPopup()) {
    sendPopupLoadEvent()
  }

  if (isChromeExtensionBackground()) {
    chrome.browserAction.setBadgeBackgroundColor({ color: '#FFB900' })
    registerExtensionListeners(dispatch)
    createContextMenus()
  }
}

export const createContextMenus = () => {
  chrome.contextMenus.removeAll()
  chrome.contextMenus.create({
    id: actions.TOGGLE_RECEIVE_PUSH_NOTIFICATIONS,
    type: 'checkbox',
    checked: true,
    title: 'Receive Push Notifications',
    contexts: ['all']
  })
}

export const sendPopupLoadEvent = () => {
  chrome.runtime.sendMessage({ messageId: extensionMessages.popupOnLoad })
}

export const registerExtensionListeners = (dispatch) => {
  chrome.runtime.onMessage.addListener((request, sender) => {
    if (request.messageId === extensionMessages.popupOnLoad) {
      dispatch(actions.notificationsRead)
    }
  })

  chrome.contextMenus.onClicked.addListener((info, tab) => {
    switch (info.menuItemId) {
      case actions.TOGGLE_RECEIVE_PUSH_NOTIFICATIONS:
        dispatch(actions.toggleReceivePushNotifications(info.checked))
        break
      default:
        break
    }
  })

  chrome.notifications.onClicked.addListener((notificationId) => {
    dispatch(actions.notificationClicked(notificationId))
  })

  chrome.notifications.onButtonClicked.addListener((notificationId, buttonIndex) => {
    dispatch(actions.notificationClicked(notificationId, buttonIndex))
  })

  chrome.notifications.onClosed.addListener(notificationId => {
    dispatch(actions.notificationRemoved(notificationId))
  })
}
