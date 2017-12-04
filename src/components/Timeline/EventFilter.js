import React from 'react'
import IconButtonStyled from '../elements/IconButtonStyled'
import ArrowDown from 'material-ui/svg-icons/navigation/arrow-downward'
import ArrowUp from 'material-ui/svg-icons/navigation/arrow-upward'
import * as eventActions from '../../actions/eventActions'

const EventFilter = ({pagination, dispatch}) =>  {
  return <div className="incident-EventFilter">
          <IconButtonStyled
            tooltip='order'
            onTouchTap={() => dispatch(eventActions.pagination.sort('occurred'))}
          >
            {
              pagination && pagination.order === 'desc'
              ? <ArrowDown/>
              : <ArrowUp/>
            }
          </IconButtonStyled>
        </div>

}

export default EventFilter