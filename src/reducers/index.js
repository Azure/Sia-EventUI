import tickets from './ticketReducers'
import auth from './authReducer'
import incidents from './incidentReducers'
import engagements from './engagementReducer'
import events from './eventReducer'
import expandSection from './expandSectionReducer'
import signalR from './signalRReducer'
import forms from './formReducer'
import eventTypes from './eventTypeReducer'


export default {
    incidents,
    auth,
    tickets,
    engagements,
    events,
    forms,
    expandSection,
    signalR,
    eventTypes
}
