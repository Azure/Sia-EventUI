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
import incidentRedirect from 'components/Incident/IncidentRedirect'
import Home from 'components/Home'
import TopNav from 'components/TopNav/TopNav'
import Debug from 'components/Debug'
import { isChromeExtensionBackground } from 'services/notificationService'
import Notifications from 'components/Extension/Notifications'

// import * from 'pluginsTemp/index'
// // introducing unnecessary duplication to determine what needs extraction.
// const _ = require('underscore')

// const hydratePlugin = (plugin) => {
//   const separator = require('path').sep
//   const directoryPath = './src/pluginsTemp'
//   var filename = _.last(plugin.path.split(separator))
//
//   plugin.newPath = [directoryPath, filename].join(separator)
//
//   return plugin
// }

// const plugins = (environment = process.env) => {
//   if (!environment.PLUGINS) { console.log('No plugins are defined.'); return }
//
//   return _.map(JSON.parse(environment.PLUGINS), hydratePlugin)
// }

//

// _.each(plugins(), function (plugin) {
//
// })

const maybePlugin = () => {
  try {
    const Checklist = require('components/Checklist') // eslint-disable-line no-unused-vars
  } catch (error) {
    if (!error.toString().includes('Cannot find module')) {
      throw error
    } else {
      console.log('Could not load', 'CHECKLIST--tktktk--plugin', 'plugin.')
    }
  }

  if (typeof Checklist !== 'undefined') {
    return <Route path='/tickets/:ticketId/checklist' component={Checklist} /> // eslint-disable-line no-undef
  }
}

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
                    { maybePlugin() }
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
