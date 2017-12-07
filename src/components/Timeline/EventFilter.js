import React from 'react'
import { connect } from 'react-redux'
import IconButtonStyled from '../elements/IconButtonStyled'
import ArrowDown from 'material-ui/svg-icons/navigation/arrow-downward'
import ArrowUp from 'material-ui/svg-icons/navigation/arrow-upward'
import * as eventActions from '../../actions/eventActions'
import AutoComplete from 'material-ui/AutoComplete'
import Chip from 'material-ui/Chip'
import { mockEventTypes } from '../elements/mockEventTypes'

const filterTypes = mockEventTypes.types

const dataSourceConfig = {
  text: 'name',
  value: 'id'
}

const chipStyles = {
  chip: {
    margin: 4
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap'
  }
}

const EventFilter = ({pagination, filterInfo, filterSearchField, dispatch}) =>  {
  const filterChips = filterInfo ? renderChips(filterInfo, dispatch): null
  return  (
    <div className="incident-EventFilter">
      {filterChips}
        <AutoComplete
                  floatingLabelText="Filter by event type"
                  filter={AutoComplete.caseInsensitiveFilter}
                  dataSource={filterTypes}
                  searchText={filterSearchField}
                  onNewRequest={(type,indexInDataSource)=>{dispatch(eventActions.addFilterOnEventType(type))}}
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

const renderChips = (eventTypes, dispatch) => {
  return (
    <div style={chipStyles.wrapper}>
      {eventTypes.map((eventType) => renderChip(eventType, dispatch))}
    </div>
  )
}

const renderChip = (eventType, dispatch) => {
  return (
    <Chip
      key={eventType.id}
      onRequestDelete={() => dispatch(eventActions.removeEventFilter(eventType))}
      style={chipStyles.chip}
    >
      {eventType.name}
    </Chip>
  )
}

const mapStateToProps = (state, ownProps) => {
  const { events } = state
  return {
    ...ownProps,
    pagination: events.pages,
    filterInfo: events.filter.eventTypes,
    filterSearchField: events.filter.filterSearchField
  }
}

export default connect(mapStateToProps)(EventFilter)
