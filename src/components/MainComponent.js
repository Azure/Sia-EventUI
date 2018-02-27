import React from 'react'
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { Router, Route } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import { PersistGate } from 'redux-persist/lib/integration/react'

import CreateIncident from 'components/Search/CreateIncident'
import Ticket from 'components/Incident/Ticket'
import CompareTickets from 'components/Incident/CompareTickets'
import EnsureLoggedInContainer from 'components/Auth/EnsureLoggedIn'
import incidentRedirect from 'components/Incident/incidentRedirect'
import Home from 'components/Home'
import TopNav from 'components/TopNav/TopNav'
import Debug from 'components/Debug'
import { isChromeExtensionBackground } from 'services/notificationService'
import Notifications from 'components/Extension/Notifications'

const history = createBrowserHistory()

export default class MainComponent extends React.Component {
  render () {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Provider store={this.props.store}>
          <PersistGate persistor={this.props.persistor}>
            <div>
              <EnsureLoggedInContainer>
                <Router history={history} >
                  <div>
                    { isChromeExtensionBackground() ? <Notifications /> : null }
                    <TopNav />
                    <Route exact path='/' component={Home} />
                    <Route exact path='/extension.html' component={Home} />
                    <Route path='/search' component={CreateIncident} />
                    <Route path='/tickets/:ticketId' component={Ticket} />
                    <Route path='/tickets/:firstTicketId/compare/:secondTicketId' component={CompareTickets} />
                    <Route path='/incidents/:incidentId' component={incidentRedirect} />
                    <Route path='/debug' render={() => <Debug />} />
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
