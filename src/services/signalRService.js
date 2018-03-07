import * as signalR from '@aspnet/signalr-client'

import { getEventActionSet } from 'actions/eventActions'
import * as signalRActions from 'actions/signalRActions'
import config from 'config'
import { getToken } from 'services/authNService'

const defaultBasePath = config.baseUrl

const defaultScopes = [config.clientId]

let signalRConnectionSingleton

export const getSignalRConnection = (dispatch) => signalRConnectionSingleton || resetSignalRConnection(dispatch)

export const resetSignalRConnection = (dispatch) => signalReduxConnection(dispatch)
    .then(connection => {
      signalRConnectionSingleton = connection
      return connection
    })

const signalReduxConnection = (dispatch) => configureConnection(dispatch)
  .then(connection => {
    startConnection(connection, dispatch)
    return connection
  })

const configureConnection = (dispatch) => getToken(defaultScopes)
  .then(token => {
    let connection = new signalR.HubConnection(defaultBasePath + 'events/live?token=' + token)

    connection.on('Send', (event) => {
      const eventObject = JSON.parse(event)
      dispatch(signalRActions.receiveMessage())
      dispatch(getEventActionSet(eventObject.incidentId, eventObject.id).succeed(eventObject))
    })

    connection.onClosed = (error) => dispatch(signalRActions.connectionClosed(error ? error.message : 'No Error Message', error ? error.stack : 'No Stack Trace'))

    return connection
  }
)

const startConnection = (connection, dispatch) => {
  dispatch(signalRActions.tryEstablishConnection())
  connection.start()
        .then(() => dispatch(signalRActions.succeedEstablishConnection()),
            (error) => dispatch(signalRActions.failEstablishConnection(error ? error.message : 'No error message', error ? error.stack : 'No stack trace provided')))
}

export const updateEventFilter = (eventFilter) => signalRConnectionSingleton.invoke('updateFilter', eventFilter)

export const clearEventFilter = () => signalRConnectionSingleton.invoke('clearFilter')

export const getEchoConnectionForTesting = () => { // Do not use in prod
  const callHistory = []

  signalRConnectionSingleton = {
    invoke: (...args) => callHistory.push([...args])
  }

  return callHistory
}

export default getSignalRConnection
