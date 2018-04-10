import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { persistStore } from 'redux-persist'

import { getSignalRConnection, updateEventFilter } from 'services/signalRService'
import { ListenForScreenSize } from 'actions/styleActions'
import incidentApp from 'reducers'
import { getFilterFromUrl } from 'services/filterService'
import { configureNotificationService } from 'services/notificationService'
import { filterTypes } from 'actions/signalRActions'

const defaultSignalREventFilterPreference = filterTypes.sync.value

const urlFilter = getFilterFromUrl(window.location.search)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(incidentApp(urlFilter, defaultSignalREventFilterPreference), composeEnhancers(applyMiddleware(thunk)))
export const persistor = persistStore(store)

getSignalRConnection(store.dispatch)
  .then(() => {
    if (defaultSignalREventFilterPreference === filterTypes.sync.value) {
      updateEventFilter(urlFilter, store.dispatch)
    }
  })

configureNotificationService(store.dispatch)

ListenForScreenSize(window, store)
