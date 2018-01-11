import { combineReducers } from 'redux'
import tickets from './ticketReducers'
import auth from './authReducer'
import incidents from './incidentReducers'
import engagements from './engagementReducer'
import events from './eventReducer'
import expandSection from './expandSectionReducer'
import signalR from './signalRReducer'
import forms from './formReducer'
import eventTypes from './eventTypeReducer'
import globalActions from './globalActionReducer'

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
    globalActions
})

export default rootReducer
