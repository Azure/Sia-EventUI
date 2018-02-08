import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { AppContainer as HotContainer } from 'react-hot-loader'

import { store, persistor } from 'configureStore'
import MainComponent from 'components/MainComponent'
//import appInsights from 'src/appInsights'
import appInsights from './appInsights'

require('./styles/App.css')

injectTapEventPlugin()

const render = (Component, store, persistor) =>
  ReactDOM.render(
    <HotContainer>
      <Component store={store} persistor={persistor} />
    </HotContainer>,
  document.getElementById('siaApp')
)

render(MainComponent, store, persistor)

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./components/MainComponent', () => {
    render(MainComponent, store, persistor)
  })
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('./reducers', () => {
    store.replaceReducer(require('./reducers').default)
  })
}
