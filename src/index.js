import 'core-js/fn/object/assign'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()
require('./styles/App.css')
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import CreateIncident from './components/Search/CreateIncident'
import Ticket from './components/Incident/Ticket'
import CompareTickets from './components/Incident/CompareTickets'
import EnsureLoggedInContainer from './components/Auth/EnsureLoggedIn'
import incidentRedirect from './components/Incident/incidentRedirect'
import Home from './components/Home'
import TopNav from './components/TopNav/TopNav'
import Debug from './components/Debug'
import { store, persistor } from './configureStore'
import { PersistGate } from 'redux-persist/lib/integration/react'


const history = createBrowserHistory()

class MainComponent extends React.Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <div>
              <EnsureLoggedInContainer>
                <Router history={history} >
                  <div>
                    <TopNav />
                    <Route exact path="/" component={Home} />
                    <Route exact path="/extension.html" component={Home} />
                    <Route path="/search" component={CreateIncident} />
                    <Route path="/tickets/:ticketId" component={Ticket} />
                    <Route path="/tickets/:firstTicketId/compare/:secondTicketId" component={CompareTickets} />
                    <Route path="/incidents/:incidentId" component={incidentRedirect} />
                    <Route path="/debug" render={() => <Debug />}/>
                  </div>
                </Router>
              </EnsureLoggedInContainer>
            </div>
          </PersistGate>
        </Provider>
      </MuiThemeProvider>
    )
  }
}

// Render the main component into the dom
ReactDOM.render(<MainComponent />, document.getElementById('siaApp'))

