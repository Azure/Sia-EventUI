import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Play from './Play'

export const DisplayPlaybook = ({
    actions,
    eventTypeId,
    eventId,
    ticketId,
    engagementId,
    incidentId
}) => {
  let localKey = 0
  return <div>
        {actions.map(action =>
            <div key={localKey++}>
                <span>
                    {action.name}
                </span>
                <br/>
                <Play
                    action={action}
                    eventTypeId={eventTypeId}
                    eventId={eventId}
                    incidentId={incidentId}
                    ticketId={ticketId}
                    engagementId={engagementId}
                />
            </div>
        )}
    </div>
}

DisplayPlaybook.propTypes = {
    actions: PropTypes.array.isRequired,
    eventTypeId: PropTypes.number.isRequired,
    eventId: PropTypes.number.isRequired,
    ticketId: PropTypes.string.isRequired,
    engagementId: PropTypes.number,
    incidentId: PropTypes.number.isRequired
}


export const mapStateToDisplayPlaybookProps = (state, ownProps) => {
    const auth = state.auth
    const engagement = state.engagements.list.find(
        engagement => engagement
        && engagement.incidentId === ownProps.incidentId
        && engagement.participant
        && engagement.participant.alias === auth.userAlias
        && engagement.participant.team === auth.userTeam
        && engagement.participant.role === auth.userRole
    )

    return {
        engagementId: engagement ? engagement.id : null,
        ...ownProps
    }
}

export default connect(mapStateToDisplayPlaybookProps)(DisplayPlaybook)
