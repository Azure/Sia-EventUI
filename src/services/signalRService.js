import * as signalR from '@aspnet/signalr'

import { getEventActionSet } from 'actions/eventActions'
import * as signalRActions from 'actions/signalRActions'
import config from 'config'
import { getToken } from 'services/authNService'

const defaultBasePath = config.baseUrl

const defaultScopes = [config.clientId]

let signalRConnectionSingleton
let appliedFilterSingleton

export const getSignalRConnection = (dispatch) => signalRConnectionSingleton
  ? Promise.resolve(signalRConnectionSingleton)
  : resetSignalRConnection(dispatch)

export const resetSignalRConnection = (dispatch) => {
  return signalReduxConnection(dispatch)
    .then(connection => {
      signalRConnectionSingleton = connection
      return signalRConnectionSingleton
    })
}

const signalReduxConnection = (dispatch) => configureConnection(dispatch)
  .then(connection => startConnection(connection, dispatch))

const configureConnection = (dispatch) => getToken(defaultScopes)
  .then(token => {
    const hubAndHttpOptions = {
      accessTokenFactory: () => token,
      transport: signalR.TransportType.WebSockets
    }

    let connection = new signalR.HubConnection(defaultBasePath + 'events/live', hubAndHttpOptions)

    connection.on('Send', (event) => {
      const eventObject = JSON.parse(event)
      dispatch(signalRActions.receiveMessage())
      dispatch(getEventActionSet(eventObject.incidentId, eventObject.id).succeed(eventObject))
    })

    connection.closedCallbacks = connection.closedCallbacks.concat((error) => dispatch(signalRActions.connectionClosed(error ? error.message : 'No Error Message', error ? error.stack : 'No Stack Trace')))

    return connection
  })

const startConnection = (connection, dispatch) => {
  dispatch(signalRActions.tryEstablishConnection())
  return connection
    .start()
    .then(() => {
      if (appliedFilterSingleton) {
        connection.invoke('updateFilter', appliedFilterSingleton)
      } else {
        connection.invoke('clearFilter')
      }
    })
    .then(() => {
      dispatch(signalRActions.succeedEstablishConnection())
      return connection
    },
    (error) => {
      dispatch(signalRActions.failEstablishConnection(error ? error.message : 'No error message', error ? error.stack : 'No stack trace provided'))
      return connection
    }
  )
}

export const updateEventFilter = (eventFilter, dispatch) => {
  appliedFilterSingleton = eventFilter
  getSignalRConnection(dispatch)
    .then(connection => connection.invoke('updateFilter', eventFilter))
}

export const clearEventFilter = (dispatch) => {
  appliedFilterSingleton = null
  getSignalRConnection(dispatch)
    .then(connection => connection.invoke('clearFilter'))
}

export const getEchoConnectionForTesting = () => { // Do not use in prod
  const callHistory = []

  signalRConnectionSingleton = {
    invoke: (...args) => callHistory.push([...args])
  }

  return callHistory
}

export default getSignalRConnection
