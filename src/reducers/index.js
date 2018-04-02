import { combineReducers } from 'redux'
import tickets from 'reducers/ticketReducers'
import auth from 'reducers/authReducer'
import incidents from 'reducers/incidentReducers'
import events from 'reducers/eventReducer'
import expandSection from 'reducers/expandSectionReducer'
import signalR from 'reducers/signalRReducer'
import forms from 'reducers/formReducer'
import eventTypes from 'reducers/eventTypeReducer'
import globalActions from 'reducers/globalActionReducer'
import notifications from 'reducers/notificationReducer'

const rootReducer = (filters, defaultEventFilterPreference) => combineReducers({
  incidents,
  auth,
  tickets,
  events: filters ? events(filters) : events(),
  forms,
  expandSection,
  signalR: signalR(defaultEventFilterPreference),
  eventTypes,
  globalActions,
  notifications
})

export default rootReducer
