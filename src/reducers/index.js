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

const rootReducer = () => combineReducers({
    incidents,
    auth,
    tickets,
    engagements,
    events,
    forms,
    expandSection,
    signalR,
    eventTypes
})

export default rootReducer
