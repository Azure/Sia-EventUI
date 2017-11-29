import React from 'react'
import { connect } from 'react-redux'
import { TextField } from 'material-ui'
import FlatButtonStyled from '../elements/FlatButtonStyled'
import { updateIncidentCreationInput } from '../../actions/incidentActions'

const onSubmit = (input, history) => () => {
    if (input) {
        history.push(/tickets/ + input)
    }
}

const submitIfEnter = (input, history) => (event) => {
    if (event.key === 'Enter') {
        onSubmit(input, history)()
    }
}

export const CreateIncident = ({input, creationError, history, dispatch}) => {
    return <div>
        <TextField
            hintText='Ticket Id of primary ticket'
            floatingLabelText='TicketId'
            onChange={(event, newValue) => dispatch(updateIncidentCreationInput(newValue))}
            onKeyDown={submitIfEnter(input,history)}
            value={input}
            errorText={creationError}
        />
        <FlatButtonStyled
            label='Submit'
            onTouchTap={onSubmit(input, history)}
        />
    </div>
}

export const mapStateToProps = (incidentActions) => (state) => {
    return {
        input: state.incidents.creation.input,
        ticketSystem: state.tickets.systems[1],
        creationError: state.incidents.creation.error ? state.incidents.creation.error.message : '',
        incidentActions
    }
}

export default (incidentActions) => connect(mapStateToProps(incidentActions))(CreateIncident)