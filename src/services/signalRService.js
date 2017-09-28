import * as signalR from '@aspnet/signalr-client'
import { getEventActionSet } from '../actions/eventActions'
import * as signalRActions from '../actions/signalRActions'

const defaultBasePath = BASE_URL

export const signalReduxConnection = (dispatch) => {
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

    connection.onclose((error) => dispatch(signalRActions.connectionClosed(error)))
    
    return connection
}

const startConnection = (connection, dispatch) => {
    dispatch(signalRActions.tryEstablishConnection())
    connection.start()
        .then(() => dispatch(signalRActions.succeedEstablishConnection()),
            (error) => dispatch(signalRActions.failEstablishConnection(error)))
}

export default signalReduxConnection