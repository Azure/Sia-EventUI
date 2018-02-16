import { combineReducers } from 'redux'
import tickets from 'reducers/ticketReducers'
import auth from 'reducers/authReducer'
import incidents from 'reducers/incidentReducers'
import engagements from 'reducers/engagementReducer'
import events from 'reducers/eventReducer'
import expandSection from 'reducers/expandSectionReducer'
import signalR from 'reducers/signalRReducer'
import forms from 'reducers/formReducer'
import eventTypes from 'reducers/eventTypeReducer'
import globalActions from 'reducers/globalActionReducer'
import notifications from 'reducers/notificationReducer'

const rootReducer = (filters) => combineReducers({
  incidents,
  auth,
  tickets,
  engagements,
  events: events(filters),
  forms,
  expandSection,
  signalR,
  eventTypes,
  globalActions,
  notifications
})

export default rootReducer
