export const NOTIFICATIONS_READ = 'NOTIFICATIONS_READ'
export const EMIT_NOTIFICATION = 'EMIT_NOTIFICATION'
export const NOTIFICATION_EMITTED = 'NOTIFICATION_EMITTED'
export const TOGGLE_RECEIVE_PUSH_NOTIFICATIONS = 'TOGGLE_RECEIVE_PUSH_NOTIFICATIONS'
export const NOTIFICATION_CLICKED = 'NOTIFICATION_CLICKED'
export const NOTIFICATION_REMOVED = 'NOTIFICATION_REMOVED'

export const notificationClicked = (notificationId, buttonIndex) => ({
  type: NOTIFICATION_CLICKED,
  notificationId,
  buttonIndex
})

export const notificationRemoved = (notificationId) => ({
  type: NOTIFICATION_REMOVED,
  notificationId
})

export const notificationEmitted = (eventId, notificationId, buttonActions) => ({
  type: NOTIFICATION_EMITTED,
  eventId,
  notificationId,
  buttonActions
})

export const emitNotification = (notification) => ({
  type: EMIT_NOTIFICATION,
  notification
})

export const toggleReceivePushNotifications = (enable) => ({
  type: TOGGLE_RECEIVE_PUSH_NOTIFICATIONS,
  enable
})

export const notificationsRead = { type: NOTIFICATIONS_READ }
