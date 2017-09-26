import * as signalR from '@aspnet/signalr-client'
import { getEventActionSet } from '../actions/eventActions'

const defaultBasePath = BASE_URL

export const signalReduxConnection = (dispatch) => {
    let connection = new signalR.HubConnection(defaultBasePath + 'events/live')

    connection.on('Send', (event) => {
        let eventObject = JSON.parse(event)
        dispatch(getEventActionSet(event.incidentId, event.id).succeed(eventObject))
    })

    connection.start()
}

export default signalReduxConnection