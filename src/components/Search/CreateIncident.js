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

export const CreateIncident = ({input, creationError, history, dispatch}) => {
    return <form onSubmit={onSubmit(input, history)}>
                <TextField
                    hintText='Ticket Id of primary ticket'
                    floatingLabelText='Ticket Id'
                    onChange={(event, newValue) => dispatch(updateIncidentCreationInput(newValue))}
                    value={input}
                    errorText={creationError}
                />
                <FlatButtonStyled
                    label='Submit'
                    onTouchTap={onSubmit(input, history)}
                />
            </form>
}

export const mapStateToProps = (state) => {
    return {
        input: state.incidents.creation.input,
        ticketSystem: state.tickets.systems[1],
        creationError: state.incidents.creation.error ? state.incidents.creation.error.message : ''
    }
}

export default connect(mapStateToProps)(CreateIncident)