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
<<<<<<< HEAD
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
=======
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
>>>>>>> 39eae44... Fix Refresh and Disengage buttons from Search
    )
}

export const Engagement = ({engagement, user}) => {
    return(<ListItem>
            {engagement.participant ? engagement.participant.alias : 'No Alias Recorded (BUG)'}
<<<<<<< HEAD
            <FlatButtonStyled
                label='Disengage'
                dispatchOnTouchTap={engagementActions.disengage(user, engagement)}
            />
        </ListItem>
=======
            <IconButtonStyled
                tooltip='Disengage'
                //dispatchOnTouchTap={engagementActions.disengage(user, engagement)}
                onTouchTap={() => dispatch(engagementActions.disengage(user, engagement))}
            >
                <RemoveCircleOutlineIcon />
            </IconButtonStyled>
        </span>
>>>>>>> 39eae44... Fix Refresh and Disengage buttons from Search
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