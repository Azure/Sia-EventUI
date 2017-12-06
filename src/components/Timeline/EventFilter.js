import React from 'react'
import { connect } from 'react-redux'
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

const EventFilter = ({pagination, filterInfo, dispatch}) =>  {
  console.log('FILTER INFO', filterInfo)
  const filterChips = filterInfo ? filterInfo.map(f=> <span key={f.id}>{f.name}</span>) : null
  console.log('FILTER CHIPS', filterChips)
  return  (
    <div className="incident-EventFilter">
      {filterChips}
      <AutoComplete
                floatingLabelText="Filter by event type"
                filter={AutoComplete.caseInsensitiveFilter}
                dataSource={filterTypes}
                onNewRequest={(type,indexInDataSource)=>{console.log('TYPE', type)
                                                        dispatch(eventActions.addFilterOnEventType(type))}}
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


const mapStateToProps = (state, ownProps) => {
  const { events } = state
  return {
    ...ownProps,
    pagination: events.pages,
    filterInfo: events.filter.eventTypes
  }
}

export default connect(mapStateToProps)(EventFilter)
