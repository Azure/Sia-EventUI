import * as signalR from '@aspnet/signalr-client'
import { getEventActionSet } from '../actions/eventActions'
import * as signalRActions from '../actions/signalRActions'

// eslint-disable-next-line no-undef
const defaultBasePath = BASE_URL

let signalRConnectionSingleton

export const establishSignalRConnection = (dispatch) => {
    if(!signalRConnectionSingleton) {
        resetSignalRConnection(dispatch)
    }
    return signalRConnectionSingleton
}

export const resetSignalRConnection = (dispatch) => {
    signalRConnectionSingleton = signalReduxConnection(dispatch)
}

const signalReduxConnection = (dispatch) => {
    let connection = configureConnection(dispatch)

    startConnection(connection, dispatch)

    return connection
}

const configureConnection = (dispatch) => {
    let connection = new signalR.HubConnection(defaultBasePath + 'events/live')

    connection.on('Send', (event) => {
        let eventObject = JSON.parse(event)
        dispatch(signalRActions.receiveMessage())
        dispatch(getEventActionSet(event.incidentId, event.id).succeed(eventObject))
    })

    connection.onClosed = (error) => dispatch(signalRActions.connectionClosed(error.message, error.stack))
    
    return connection
}

const startConnection = (connection, dispatch) => {
    dispatch(signalRActions.tryEstablishConnection())
    connection.start()
        .then(() => dispatch(signalRActions.succeedEstablishConnection()),
            (error) => dispatch(signalRActions.failEstablishConnection(error.message, error.stack)))
}

export default establishSignalRConnection
