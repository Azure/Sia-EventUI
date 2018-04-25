import { combineReducers } from 'redux'

import tickets from 'reducers/ticketReducers'
import auth from 'reducers/authReducer'
import incidents from 'reducers/incidentReducers'
import events from 'reducers/eventReducer'
import signalR from 'reducers/signalRReducer'
import forms from 'reducers/formReducer'
import eventTypes from 'reducers/eventTypeReducer'
import globalActions from 'reducers/globalActionReducer'
import notifications from 'reducers/notificationReducer'
import timePreferences from 'reducers/timePreferencesReducer'

const rootReducer = (filters, defaultEventFilterPreference) => combineReducers({
  incidents,
  auth,
  tickets,
  events: filters ? events(filters) : events(),
  forms,
  signalR: signalR(defaultEventFilterPreference),
  eventTypes,
  globalActions,
  notifications,
  timePreferences
})

export default rootReducer
