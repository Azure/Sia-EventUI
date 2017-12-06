import React from 'react'
import IconButtonStyled from '../elements/IconButtonStyled'
import ArrowDown from 'material-ui/svg-icons/navigation/arrow-downward'
import ArrowUp from 'material-ui/svg-icons/navigation/arrow-upward'
import * as eventActions from '../../actions/eventActions'
import AutoComplete from 'material-ui/AutoComplete'
import { mockEventTypes } from '../elements/mockEventTypes'

const filterTypes = mockEventTypes.types

const dataSourceConfig = {
  text: 'name',
  value: 'id'
}

const EventFilter = ({pagination, dispatch, eventActions}) =>  {
  return  (
    <div className="incident-EventFilter">
      <AutoComplete
                floatingLabelText="Filter by event type"
                filter={AutoComplete.caseInsensitiveFilter}
                dataSource={filterTypes}
                onNewRequest={(type,indexInDataSource)=>dispatch(eventActions.addFilterOnEventType(type))}
                dataSourceConfig={dataSourceConfig}
      />
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
  )
}

export default EventFilter