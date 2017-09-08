import React, { Component } from 'react'
import IconButtonStyled from '../elements/IconButtonStyled'
import FlatButtonStyled from '../elements/FlatButtonStyled'
import Dialog from 'material-ui/Dialog'
import AddEvent from '../Timeline/AddEvent'
import LibraryAdd from 'material-ui/svg-icons/av/library-add'

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
            <div>
                <strong>Incoming Event:</strong> [hide]<br/>
                <IconButtonStyled
                    onTouchTap={this.handleOpenAddEvent}
                >
                    <LibraryAdd />
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
            </div>
        )
    }
}

export default EventDialogControl