import React from 'react'
import { connect } from 'react-redux'
import * as engagementActions from 'actions/engagementActions'
import IconButtonStyled from 'components/elements/IconButtonStyled'
import PeopleIcon from 'material-ui/svg-icons/social/people'
import AddCircleOutlineIcon from 'material-ui/svg-icons/content/add-circle-outline'
import RemoveCircleOutlineIcon from 'material-ui/svg-icons/content/remove-circle-outline'

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
        <IconButtonStyled tooltip='Engagement'>
          <PeopleIcon />
        </IconButtonStyled>
                &nbsp;
        {Array
                    .from(engagements.filter(engagement => !engagement.timeDisengaged))
                    .map(engagement =>
                      <Engagement
                        key={'engagement' + engagement.id}
                        engagement={engagement}
                        user={user}
                        dispatch={dispatch}
                        />)
                }
      </span>
      <Engage dispatch={dispatch} incidentId={incidentId} user={user} />
    </div>
  )
}

export const Engagement = ({dispatch, engagement, user}) => {
  return (
    <span>
      {engagement.participant ? engagement.participant.alias : 'No Alias Recorded (BUG)'}
      <IconButtonStyled
        tooltip='Disengage'
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
      onTouchTap={() => dispatch(engagementActions.engage(incidentId, user))}
        >
      <AddCircleOutlineIcon />
    </IconButtonStyled>
  )
}

export const EngageRedux = connect(mapStateToPropsEngage)(Engage)
const EngagementsRedux = connect(mapStateToPropsEngagements)(Engagements)
export default EngagementsRedux
