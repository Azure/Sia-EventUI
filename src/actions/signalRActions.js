import * as signalRService from 'services/signalRService'

export const ESTABLISH_CONNECTION_TRY = 'ESTABLISH_CONNECTION_TRY'
export const ESTABLISH_CONNECTION_SUCCEED = 'ESTABLISH_CONNECTION_SUCCEED'
export const ESTABLISH_CONNECTION_FAIL = 'ESTABLISH_CONNECTION_FAIL'
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE'
export const ACKNOWLEDGE_MESSAGES = 'ACKNOWLEDGE_MESSAGES'
export const CONNECTION_CLOSED = 'CONNECTION_CLOSED'
export const UPDATE_FILTER_PREFERENCE_EVENTS = 'UPDATE_FILTER_PREFERENCE_EVENTS'

export const tryEstablishConnection = () => ({
  type: ESTABLISH_CONNECTION_TRY
})

export const succeedEstablishConnection = () => ({
  type: ESTABLISH_CONNECTION_SUCCEED
})

export const failEstablishConnection = (error, stack) => ({
  type: ESTABLISH_CONNECTION_FAIL,
  error,
  stack
})

export const receiveMessage = () => ({
  type: RECEIVE_MESSAGE
})

export const acknowledgeMessages = () => ({
  type: ACKNOWLEDGE_MESSAGES
})

export const connectionClosed = (error, stack) => ({
  type: CONNECTION_CLOSED,
  error,
  stack
})

export const filterTypes = {
  none: {
    value: 'none',
    description: 'Do not filter events sent from the Gateway'
  },
  sync: {
    value: 'sync',
    description: 'Receive only events that match the event filter on the current page'
  }
}

export const updateEventFilterPreference = (filterType, eventFilter) => (dispatch) => {
  if (filterType === filterTypes.sync.value) {
    signalRService.updateEventFilter(eventFilter)
  }
  if (filterType === filterTypes.none.value) {
    signalRService.clearEventFilter()
  }
  dispatch(updateEventfilterPreferenceActionCreator(filterType))
}

const updateEventfilterPreferenceActionCreator = (filterType) => ({
  type: UPDATE_FILTER_PREFERENCE_EVENTS,
  filterType
})
