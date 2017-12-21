import * as signalR from '@aspnet/signalr-client'
import { getEventActionSet } from '../actions/eventActions'
import * as signalRActions from '../actions/signalRActions'
import config from 'config'

const defaultBasePath = config.baseUrl

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
        const eventObject = JSON.parse(event)
        dispatch(signalRActions.receiveMessage())
        dispatch(getEventActionSet(eventObject.incidentId, eventObject.id).succeed(eventObject))
    })

    connection.onClosed = (error) => dispatch(signalRActions.connectionClosed(error ? error.message : 'No Error Message', error ? error.stack : 'No Stack Trace'))

    return connection
}

const startConnection = (connection, dispatch) => {
    dispatch(signalRActions.tryEstablishConnection())
    connection.start()
        .then(() => dispatch(signalRActions.succeedEstablishConnection()),
            (error) => dispatch(signalRActions.failEstablishConnection(error ? error.message : 'No error message', error ? error.stack : 'No stack trace provided')))
}

export default establishSignalRConnection
