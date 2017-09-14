import React from 'react'
import { connect } from 'react-redux'
import FlatButtonStyled from './elements/FlatButtonStyled'
import { List, ListItem } from 'material-ui'
import * as engagementActions from '../actions/engagementActions'

export const mapStateToPropsEngagements = (state, ownProps) => {
    return {
        ...ownProps,
        user: {
            alias: state.auth.userAlias,
            team: state.auth.userTeam,
            role: state.auth.userRole
        }
    }
}

export const Engagements = ({incidentId, engagements, user}) => {
    return (
        <List>
            {Array
                .from(engagements.filter(engagement => !engagement.timeDisengaged))
                .map(engagement =>
                    <Engagement
                        key={'engagement' + engagement.id}
                        engagement={engagement}
                        user={user}
                    />)
            }
            <Engage incidentId={incidentId} user={user}/>
        </List>
    )
}

export const Engagement = ({engagement, user}) => {
    return(<ListItem>
            {engagement.participant ? engagement.participant.alias : 'No Alias Recorded (BUG)'}
            <FlatButtonStyled
                label='Disengage'
                dispatchOnTouchTap={engagementActions.disengage(user, engagement)}
            />
        </ListItem>
    )
}

export const mapStateToPropsEngage = (state, ownProps) => {
    return {
        ...ownProps,
        user: {
            alias: state.auth.userAlias,
            team: state.auth.userTeam,
            role: state.auth.userRole
        }
    }
}

export const Engage = ({incidentId, user}) => {
    return(<FlatButtonStyled
                label='Engage On This Issue'
                dispatchOnTouchTap={engagementActions.engage(incidentId, user)}
            />
    )
}

export const EngageRedux = connect(mapStateToPropsEngage)(Engage)
const EngagementsRedux = connect(mapStateToPropsEngagements)(Engagements)
export default EngagementsRedux