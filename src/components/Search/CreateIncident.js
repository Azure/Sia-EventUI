import React from 'react'
import { connect } from 'react-redux'
import { TextField } from 'material-ui'
import FlatButtonStyled from '../elements/FlatButtonStyled'
import * as incidentActions from '../../actions/incidentActions.js'

const onSubmit = (ticketLookup, input, dispatch, ticketSystem) => () => {
    if(ticketLookup[input])
    {
        dispatch(incidentActions.duplicateIncident(input))
    }
    else
    {
        dispatch(incidentActions.postIncident(input, ticketSystem))
    }
}

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