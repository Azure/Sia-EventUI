import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import { Link } from 'react-router-dom'

export const ComparisonLinks = ({otherIncidentTicketIds, ticketId}) => {
    let key = 0
    return <SelectField floatingLabelText="Compare With Incident">
                    {otherIncidentTicketIds.map(otherTicketId =>
                        <MenuItem
                            key={key++}
                            primaryText={
                                <Link to={`/tickets/${ticketId}/compare/${otherTicketId}`}>
                                    {otherTicketId}
                                </Link>
                            }
                        />
                    )}
                </SelectField>

}

export const mapStateToProps = (state, ownProps) => {
    const { ticketId } = ownProps
    const thisIncidentId = state.tickets.map[ticketId].incidentId
    const otherIncidentTicketIds = Object.values(state.incidents.map)
        .filter(incident => incident && incident.primaryTicket && incident.primaryTicket.originId)
        .filter(incident => incident.id !== thisIncidentId)
        .map(incident => incident.primaryTicket.originId)
    return {
        ticketId: ownProps.ticketId,
        otherIncidentTicketIds
    }
}

ComparisonLinks.propTypes = {
    otherIncidentTicketIds: PropTypes.array,
    ticketId: PropTypes.number
}

export default connect(mapStateToProps)(ComparisonLinks)