import { combineReducers } from 'redux'
import tickets from './ticketReducers'
import auth from './authReducer'
import incidents from './incidentReducers'
import engagements from './engagementReducer'
import events from './eventReducer'
import signalR from './signalRReducer'
import popup from './popupReducer'
import forms from './formReducer'

const rootReducer = combineReducers({
    incidents,
    auth,
    tickets,
    engagements,
    events,
    signalR,
    popup,
    forms
})

export default rootReducer