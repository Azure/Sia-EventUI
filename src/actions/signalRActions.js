export const ESTABLISH_CONNECTION_TRY = 'ESTABLISH_CONNECTION_TRY'
export const ESTABLISH_CONNECTION_SUCCEED = 'ESTABLISH_CONNECTION_SUCCEED'
export const ESTABLISH_CONNECTION_FAIL = 'ESTABLISH_CONNECTION_FAIL'
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE'
export const ACKNOWLEDGE_MESSAGES = 'ACKNOWLEDGE_MESSAGES'
export const CONNECTION_CLOSED = 'CONNECTION_CLOSED'


export const tryEstablishConnection = () => ({
    type: ESTABLISH_CONNECTION_TRY
})

export const succeedEstablishConnection = () => ({
    type: ESTABLISH_CONNECTION_SUCCEED
})

export const failEstablishConnection = (error) => ({
    type: ESTABLISH_CONNECTION_FAIL,
    error
})

export const receiveMessage = () => ({
    type: RECEIVE_MESSAGE
})

export const acknowledgeMessages = () => ({
    type: ACKNOWLEDGE_MESSAGES
})

export const connectionClosed = (error) => ({
    type: CONNECTION_CLOSED,
    error
})