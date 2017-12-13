import 'core-js/fn/object/assign'
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import incidentApp from './reducers'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import injectTapEventPlugin from 'react-tap-event-plugin'
import thunk from 'redux-thunk'
injectTapEventPlugin()
require('./styles/App.css')
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import queryString from 'query-string'
import createBrowserHistory from 'history/createBrowserHistory'
import CreateIncident from './components/Search/CreateIncident'
import Ticket from './components/Incident/Ticket'
import CompareTickets from './components/Incident/CompareTickets'
import EnsureLoggedInContainer from './components/Auth/EnsureLoggedIn'
import incidentRedirect from './components/Incident/incidentRedirect'
import TopNav from './components/TopNav/TopNav'
import Debug from './components/Debug'
import { ListenForScreenSize } from './actions/styleActions'
import { authContext, clientId, generateSiaContext } from './services/adalService'
import establishSignalRConnection from './services/signalRService'
import {getFilter, referenceData} from './services/filterService'

import Popups from './components/Popups'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(incidentApp(getFilter(window.location.search, referenceData.types)), composeEnhancers(applyMiddleware(thunk)))

establishSignalRConnection(store.dispatch)

ListenForScreenSize(window, store)
const history = createBrowserHistory()

class MainComponent extends React.Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Provider store={store}>
          <div>
            <EnsureLoggedInContainer>
              <Router history={history} >
                <div>
                  <TopNav />
                  <Popups />
                  <Route exact path="/" component={CreateIncident} />
                  <Route exact path="/tickets/:ticketId" component={Ticket} />
                  <Route path="/tickets/:firstTicketId/compare/:secondTicketId" component={CompareTickets} />
                  <Route path="/incidents/:incidentId" component={incidentRedirect} />
                  <Route path="/debug" render={() => <Debug />}/>
                </div>
              </Router>
            </EnsureLoggedInContainer>
          </div>
        </Provider>
      </MuiThemeProvider>
    )
  }
}

// Render the main component into the dom
ReactDOM.render(<MainComponent />, document.getElementById('app'))

