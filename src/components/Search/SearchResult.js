import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { ListItem } from 'material-ui'
import { IconButtonStyled } from '../elements/IconButtonStyled'
import Lens from 'material-ui/svg-icons/image/lens'
import { redA400, yellowA400, blueA400, greenA400 } from 'material-ui/styles/colors'
import Engagements from '../Engagements'

export function setLensColor(severity, status) {
    let color = yellowA400
    if(severity == '1')
         color = redA400
    if (status == 'Resolved')
        color = greenA400
    if (status == 'Mitigated')
        color = blueA400
    return color
}

export const SearchResult = ({ticket, incident, dispatch, engagementActions}) => {
        return (
        <ListItem
            leftIcon={
                <IconButtonStyled tooltip={ticket.status}>
                    <Lens color={setLensColor(ticket.severity, ticket.status)}/>
                </IconButtonStyled>
            }
        >
            <Link to={/tickets/ + ticket.originId}>
                [Sev {ticket.severity ? ticket.severity : 'Unknown'} / ID {ticket.originId}]<br />
                {ticket.title}<br />
                Owning Service: {ticket.owningService ? ticket.owningService : 'Owning Service Unknown'}<br />
                IM Name: {ticket.imName ? ticket.imName : 'IM Name Unknown'}<br />
                IM Alias: {ticket.imAlias ? ticket.imAlias : 'IM Alias Unknown'}
            </Link>
            <Engagements
                incidentId={ticket.incidentId}
                engagements={incident.engagements}
                dispatch={dispatch}
                engagementActions={engagementActions}
            />
        </ListItem>
    )
}


export const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        incident: state.incidents.map[ownProps.ticket.incidentId]
    }
}

export default connect(mapStateToProps)(SearchResult)