import React from 'react'
import { connect } from 'react-redux'
import { TextField } from 'material-ui'
import FlatButtonStyled from '../elements/FlatButtonStyled'
import { updateIncidentCreationInput, duplicateIncident } from '../../actions/incidentActions'
const onSubmit = (ticketLookup, input, dispatch, ticketSystem, history, incidentActions) => () => {
    if(ticketLookup[input])
    {
        dispatch(duplicateIncident(input))
    }
    else
    {
        dispatch(incidentActions.postIncident(input, ticketSystem))
    }
    history.push(/tickets/ + input)
}

export const CreateIncident = ({ticketLookup, input, ticketSystem, creationError, history, dispatch, incidentActions}) => {
    return <div>
        <TextField
            hintText='Ticket Id of primary ticket'
            floatingLabelText='Create Incident'
            onChange={(event, newValue) => dispatch(updateIncidentCreationInput(newValue))}
            value={input}
            errorText={creationError}
        />
        <FlatButtonStyled
            label='Submit'
            onTouchTap={onSubmit(ticketLookup, input, dispatch, ticketSystem, history, incidentActions)}
        />
    </div>
}

export const mapStateToProps = (incidentActions) => (state) => {
    return {
        ticketLookup: state.tickets.map,
        input: state.incidents.creation.input,
        ticketSystem: state.tickets.systems[1],
        creationError: state.incidents.creation.error ? state.incidents.creation.error.message : '',
        incidentActions
    }
}

export default (incidentActions) => connect(mapStateToProps(incidentActions))(CreateIncident)