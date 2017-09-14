import React, { Component } from 'react'
import IconButtonStyled from '../elements/IconButtonStyled'
import FlatButtonStyled from '../elements/FlatButtonStyled'
import Dialog from 'material-ui/Dialog'
import AddEvent from '../Timeline/AddEvent'
import OpenInNewIcon from 'material-ui/svg-icons/action/open-in-new'

class EventDialogControl extends Component {
    constructor(props) {
        super(props)
        this.state = {
            openEventDialog: false,
            selectedIncidentId: props.incidentIds[0],
            eventInput: ''
        }
        this.handleOpenAddEvent = this.handleOpenAddEvent.bind(this)
        this.handleCloseAddEvent = this.handleCloseAddEvent.bind(this)
        this.handleUpdateEvent = this.handleUpdateEvent.bind(this)
    }

    handleOpenAddEvent = () => {this.setState({
            openEventDialog: true
        })}
    
    handleCloseAddEvent = () => {this.setState({
            openEventDialog: false
        })}

    handleUpdateEvent = (stateKey) => (event) => {
        if(event && event.target) {
            this.setState({
                [stateKey]: event.target.value
            })
        }
    }

    render () {
        const { incidentIds } = this.props

        

        const dialogActions = [
            <FlatButtonStyled
                label='Cancel'
                onTouchTap={this.handleCloseAddEvent}
            />,
            <FlatButtonStyled
                label='Submit'
                onTouchTap={this.handleCloseAddEvent}
            />
        ]
        
        return (
            <strong>
                Incident Event:
                &nbsp;
                <IconButtonStyled
                    tooltip="Enter new event"
                    onTouchTap={this.handleOpenAddEvent}
                >
                    <OpenInNewIcon />
                </IconButtonStyled>
                <Dialog
                    title='Please enter a custom event:'
                    actions={dialogActions}
                    open={this.state.openEventDialog}
                    modal={false}
                    onRequestClose={this.handleCloseAddEvent}
                >
                    <AddEvent
                        onRequestClose={this.handleCloseAddEvent}
                        incidentIds={incidentIds}
                        eventInput={this.state.eventInput}
                        selectedIncidentId={this.state.selectedIncidentId}
                        updateEventInput={this.handleUpdateEvent('eventInput')}
                        updateSelectedIncidentId={this.handleUpdateEvent('selectedIncidentId')}
                    />
                </Dialog>
            </strong>
        )
    }
}

export default EventDialogControl