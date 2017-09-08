import { combineReducers } from 'redux'
import tickets from './ticketReducers'
import auth from './authReducer'
import incidents from './incidentReducers'

const rootReducer = combineReducers({
    incidents,
    auth,
    tickets
})

export default rootReducer