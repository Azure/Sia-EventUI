import * as signalRActions from '../actions/signalRActions'

export const connectionStatuses = {
    notEstablished: 'notEstablished',
    connecting: 'connecting',
    disconnected: 'disconnected',
    connected: 'connected',
    error: 'error'
}

const defaultState = {
    connectionStatus: connectionStatuses.notEstablished,
    pendingMessages: 0
}

const signalRReducer = (state = defaultState, action) => {
    switch(action.type) {
        case signalRActions.ESTABLISH_CONNECTION_TRY:
            return {
                ...state,
                connectionStatus: connectionStatuses.connecting,
            }
        case signalRActions.ESTABLISH_CONNECTION_FAIL:
            return {
                ...state,
                connectionStatus: connectionStatuses.error,
                connectionError: action.error
            }
        case signalRActions.ESTABLISH_CONNECTION_SUCCEED:
            return {
                ...state,
                connectionStatus: connectionStatuses.connected,
                connectionError: null,
                disconnectReason: null
            }
        case signalRActions.CONNECTION_CLOSED:
            return {
                ...state,
                connectionStatus: connectionStatuses.disconnected,
                disconnectReason: action.error
            }
        case signalRActions.RECEIVE_MESSAGE:
            return {
                ...state,
                pendingMessages: state.pendingMessages ? state.pendingMessages + 1 : 1
            }
        case signalRActions.ACKNOWLEDGE_MESSAGES:
            return {
                ...state,
                pendingMessages: 0
            }
        default:
            return {
                ...state
            }
    }
}

export default signalRReducer