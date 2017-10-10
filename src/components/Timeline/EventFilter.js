import React from 'react'
import FlatButtonStyled from '../elements/FlatButtonStyled'
import IconButtonStyled from '../elements/IconButtonStyled'
import ArrowDown from 'material-ui/svg-icons/navigation/arrow-downward'
import ArrowUp from 'material-ui/svg-icons/navigation/arrow-upward'
import * as eventActions from '../../actions/eventActions'

const defaultPrimary = 'All'

const filterLabels = [
  'All',
  'Active',
  'Dismissed',
  'System',
  'Manual'
]

const EventFilter = ({pagination, dispatch}) =>  {
  return <div className="incident-EventFilter">
          {filterLabels.map(label => <FlatButtonStyled label={label} key={label} primary={label === defaultPrimary}/>)}
          <IconButtonStyled
            tooltip='order'
            onTouchTap={() => dispatch(eventActions.pagination.sort('occurred'))}
          >
            {
              pagination && pagination.order === 'asc'
              ? <ArrowDown/>
              : <ArrowUp/>
            }
          </IconButtonStyled>
        </div>

}

export default EventFilter