import { combineReducers } from 'redux'
import * as notificationActions from 'actions/notificationActions'

const notificationOptionsInitialState = {
  receivePushNotificationsEnabled: true
}

export function notificationOptionsReducer (state = notificationOptionsInitialState, action) {
  switch (action.type) {
    case notificationActions.TOGGLE_RECEIVE_PUSH_NOTIFICATIONS:
      return {
        ...state,
        receivePushNotificationsEnabled: action.enable
      }
    default:
      return state
  }
}

const unreadNotificationCountInitialState = 0

export function unreadNotificationCountReducer (state = unreadNotificationCountInitialState, action) {
  switch (action.type) {
    case notificationActions.EMIT_NOTIFICATION:
      return state + 1
    case notificationActions.NOTIFICATIONS_READ:
      return 0
    default:
      return state
  }
}

const notificationListInitialState = []

export function notificationListReducer (state = notificationListInitialState, action) {
  switch (action.type) {
    case notificationActions.EMIT_NOTIFICATION:
      return state.concat(action.notification)
    case notificationActions.NOTIFICATION_EMITTED:
      return state.map(notification =>
          notification.event.id === action.eventId
          ? {
            ...notification,
            notificationId: action.notificationId,
            isEmitted: true,
            buttonActions: action.buttonActions
          }
          : notification)
    case notificationActions.NOTIFICATION_CLICKED:
      return state.map(notification =>
        notification.notificationId === action.notificationId
        ? { ...notification, isClicked: true, buttonIndex: action.buttonIndex }
        : notification)
    case notificationActions.NOTIFICATION_REMOVED:
      return state.filter(notification => notification.notificationId !== action.notificationId)
    default:
      return state
  }
}

export default combineReducers({
  options: notificationOptionsReducer,
  unreadCount: unreadNotificationCountReducer,
  list: notificationListReducer
})
