import React from 'react'
import { connect } from 'react-redux'
import { TextField } from 'material-ui'
import FlatButtonStyled from '../elements/FlatButtonStyled'
import * as incidentActions from '../../actions/incidentActions.js'
import { Router, Route, Redirect} from 'react-router-dom'

const onSubmit = (ticketLookup, input, dispatch, ticketSystem) => () => {
    if(ticketLookup[input])
    {
        dispatch(incidentActions.duplicateIncident(input))
    }
    else
    {
        dispatch(incidentActions.postIncident(input, ticketSystem))
    }
    //window.location.replace(window.location + 'tickets/' + input)
    /* 
    <Router>
        <Route path={/tickets/ + input} />
        <Redirect push to={/tickets/ + input} />
    </Router>
     */
    //dispatch(<Redirect to={/tickets/ + input} push={true} />)
    //<Redirect to="/tickets/38502026" push={true} />
}

  const RedirectButton = () => (
    <Route render={({ history}) => (
      <button
        type='button'
        onClick={() => { history.push('/tickets/38502026') }}
      >
        Click Me!
      </button>
    )} />
  )

export const CreateIncident = ({ticketLookup, input, ticketSystem, creationError, dispatch}) => {
    return <div>
        <TextField
            hintText='Ticket Id of primary ticket'
            floatingLabelText='Create Incident'
            onChange={(event, newValue) => dispatch(incidentActions.updateIncidentCreationInput(newValue))}
            value={input}
            errorText={creationError}
        />
        <FlatButtonStyled
            label='Submit'
            onTouchTap={onSubmit(ticketLookup, input, dispatch, ticketSystem)}
        />
        <RedirectButton />
    </div>
}

export function mapStateToProps(state){
    return {
        ticketLookup: state.tickets.map,
        input: state.incidents.creation.input,
        ticketSystem: state.tickets.systems[1],
        creationError: state.incidents.creation.error ? state.incidents.creation.error.message : ''
    }
}

export default connect(mapStateToProps)(CreateIncident)