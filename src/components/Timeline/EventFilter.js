import React from 'react'
import { connect } from 'react-redux'
import IconButtonStyled from '../elements/IconButtonStyled'
import ArrowDown from 'material-ui/svg-icons/navigation/arrow-downward'
import ArrowUp from 'material-ui/svg-icons/navigation/arrow-upward'
import {removeFilter} from '../../actions/eventActions'
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

const EventFilter = ({eventActions, pagination, filter, dispatch}) =>  {
  const filterChips = filter.eventTypes ? renderChips(filter, dispatch): null
  return  (
    <div className="incident-EventFilter">
      {filterChips}
        <AutoComplete
                  floatingLabelText="Filter by event type"
                  filter={AutoComplete.caseInsensitiveFilter}
                  dataSource={filterTypes}
                  // searchText={filterSearchField}
                  onNewRequest={
                    (eventType, indexInDataSource) => {dispatch(eventActions.addFilter(filter, eventType))}}
                    // (eventType,indexInDataSource)=>{dispatch(eventActions.addFilterOnEventType(eventType))}}
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

const renderChips = (filter, dispatch) => {
  return (
    <div style={chipStyles.wrapper}>
      {filter.eventTypes.map((eventType) => renderChip(filter, eventType, dispatch))}
    </div>
  )
}

const renderChip = (filter, eventType, dispatch) => {
  return (
    <Chip
      key={eventType.id}
      onRequestDelete={() => dispatch(removeFilter(filter, eventType))}
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
    filter: events.filter
    // filterSearchField: events.filter.filterSearchField
  }
}

export default connect(mapStateToProps)(EventFilter)
