import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { TextField } from 'material-ui'
import FlatButtonStyled from 'components/elements/FlatButtonStyled'
import { updateTicketNavigationInput } from 'actions/incidentActions'
import Paper from 'material-ui/Paper'

export const onSubmit = (input, history) => () => {
  if (input) {
    history.push('/tickets/' + input)
  }
}

export const GoToTicketForm = ({input, creationError, history, dispatch}) => <form
  id='incident-navigation'
  onSubmit={onSubmit(input, history)}
  style={{padding: '16px'}}
>
  <TextField
    hintText='Ticket Id'
    floatingLabelText='Ticket Id'
    onChange={(event, newValue) => dispatch(updateTicketNavigationInput(newValue))}
    value={input}
    errorText={creationError}
  />
  <FlatButtonStyled
    label='Submit'
    onTouchTap={onSubmit(input, history)}
  />
</form>

export const mapStateToProps = (state, ownProps) => {
  return {
    input: state.incidents.creation.input,
    ticketSystem: state.tickets.systems[1],
    creationError: state.incidents.creation.error ? state.incidents.creation.error.message : '',
    ...ownProps
  }
}

GoToTicketForm.propTypes = {
  input: PropTypes.string,
  creationError: PropTypes.string,
  history: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

export const ConnectedGoToTicketForm = connect(mapStateToProps)(GoToTicketForm)

export const GoToTicket = ({history}) => <Paper zDepth={1}>
  <span>Go To Ticket:</span>
  <ConnectedGoToTicketForm history={history} />
</Paper>

export default GoToTicket
