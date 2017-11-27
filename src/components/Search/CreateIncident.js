import React from 'react'
import { connect } from 'react-redux'
import { TextField } from 'material-ui'
import FlatButtonStyled from '../elements/FlatButtonStyled'
import { updateIncidentCreationInput } from '../../actions/incidentActions'

const onSubmit = (input, ticketSystem, history) => () => {

    history.push(/tickets/ + input)
}

export const CreateIncident = ({input, ticketSystem, creationError, history, dispatch}) => {
    return <div>
        <TextField
            hintText='Ticket Id of primary ticket'
            floatingLabelText='TicketId'
            onChange={(event, newValue) => dispatch(updateIncidentCreationInput(newValue))}
            value={input}
            errorText={creationError}
        />
        <FlatButtonStyled
            label='Submit'
            onTouchTap={onSubmit(input, ticketSystem, history)}
        />
    </div>
}

export const mapStateToProps = (state) => {
    return {
        input: state.incidents.creation.input,
        ticketSystem: state.tickets.systems[1],
        creationError: state.incidents.creation.error ? state.incidents.creation.error.message : ''
    }
}

export default connect(mapStateToProps)(CreateIncident)