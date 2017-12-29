import React from 'react'
import { connect } from 'react-redux'
import DisplayGlobalActions from './DisplayGlobalActions'
import BootstrapGlobalActions from './BootstrapGlobalActions'

export const GlobalActions = ({
    incidentId,
    ticketId,
    actions
}) => actions && actions.length
    ? <DisplayGlobalActions
        incidentId={incidentId}
        ticketId={ticketId}
    />
    : <BootstrapGlobalActions />

export const mapStateToGlobalActionsProps = (state, ownProps) => ({
    ...ownProps,
    actions: Object.values(state.globalActions)
})

export default connect(mapStateToGlobalActionsProps)(GlobalActions)