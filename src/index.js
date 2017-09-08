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
import createBrowserHistory from 'history/createBrowserHistory'
import Search from './components/Search/Search'
import Ticket from './components/Incident/Ticket'
import CompareTickets from './components/Incident/CompareTickets'
import EnsureLoggedInContainer from './components/Auth/EnsureLoggedIn'
import incidentRedirect from './components/Incident/incidentRedirect'
import TopNav from './components/TopNav/TopNav'
import Debug from './components/Debug'
import { ListenForScreenSize } from './actions/styleActions'
import { ADAL } from './services/adalService'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(incidentApp, composeEnhancers(applyMiddleware(thunk)))

const ADALInstance = ADAL(store.dispatch)

ListenForScreenSize(window, store)
const history = createBrowserHistory()





class MainComponent extends React.Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Provider store={store}>
          <div>
            <EnsureLoggedInContainer ADAL={ADALInstance}>
              <Router history={history} >
                <div>
                  <TopNav />
                  <Route exact path="/" component={Search} />
                  <Route exact path="/tickets/:ticketId" component={Ticket} />
                  <Route path="/tickets/:firstTicketId/compare/:secondTicketId" component={CompareTickets} />
                  <Route path="/incidents/:incidentId" component={incidentRedirect} />
                  <Route path="/debug" render={() => <Debug authContext={ADALInstance}/>}/>
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
