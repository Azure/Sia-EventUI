import React from 'react'
import { connect } from 'react-redux'
import IconButtonStyled from './elements/IconButtonStyled'
import PeopleIcon from 'material-ui/svg-icons/social/people'
import AddCircleOutlineIcon from 'material-ui/svg-icons/content/add-circle-outline'
import RemoveCircleOutlineIcon from 'material-ui/svg-icons/content/remove-circle-outline'
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

export const Engagements = ({dispatch, incidentId, engagements, user}) => {
    return (
        <div>
            <span>
                <IconButtonStyled tooltip="Engagment">
                    <PeopleIcon />
                </IconButtonStyled>
                &nbsp;
                {Array
                    .from(engagements.filter(engagement => !engagement.timeDisengaged))
                    .map(engagement =>
                        <Engagement
                            dispatch={dispatch}
                            engagement={engagement}
                            user={user}
                            key={'engagement' + engagement.id}
                        />)
                }
            </span>
            <Engage dispatch={dispatch} incidentId={incidentId} user={user}/>
        </div>
    )
}

export const Engagement = ({dispatch, engagement, user}) => {
    return (
        <span>
            {engagement.participant ? engagement.participant.alias : 'No Alias Recorded (BUG)'}
            <IconButtonStyled
                tooltip='Disengage'
                //dispatchOnTouchTap={engagementActions.disengage(user, engagement)}
                onTouchTap={() => dispatch(engagementActions.disengage(user, engagement))}
            >
                <RemoveCircleOutlineIcon />
            </IconButtonStyled>
        </span>
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

export const Engage = ({dispatch, incidentId, user}) => {
    return (
        <IconButtonStyled
            tooltip='Engage'
            //dispatchOnTouchTap={engagementActions.engage(incidentId, user)}
            onTouchTap={() => dispatch(engagementActions.engage(incidentId, user))}
        >
            <AddCircleOutlineIcon />
        </IconButtonStyled>
    )
}

export const EngageRedux = connect(mapStateToPropsEngage)(Engage)
const EngagementsRedux = connect(mapStateToPropsEngagements)(Engagements)
export default EngagementsRedux