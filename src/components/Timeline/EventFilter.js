import React from 'react'
import { connect } from 'react-redux'
import IconButtonStyled from '../elements/IconButtonStyled'
import ArrowDown from 'material-ui/svg-icons/navigation/arrow-downward'
import ArrowUp from 'material-ui/svg-icons/navigation/arrow-upward'
// import {removeFilter} from '../../actions/eventActions'
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

const EventFilter = ({eventActions, pagination, filter, filterSearchField, dispatch}) =>  {

  const filterChips = filter.eventTypes ? renderChips(eventActions, filter, dispatch): null
  return  (
    <div className="incident-EventFilter">
      {filterChips}
      <AutoComplete
        floatingLabelText="Filter by event type"
        filter={AutoComplete.caseInsensitiveFilter}
        dataSource={filterTypes}
        searchText={filterSearchField}
        onUpdateInput={(searchText) => dispatch(eventActions.updateFilterSearchBox(searchText))}        
        onNewRequest={
          (eventType, indexInDataSource) => {
            dispatch(eventActions.addFilter(filter, eventType))
            dispatch(eventActions.updateFilterSearchBox(''))
          }
        }
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

const renderChips = (eventActions, filter, dispatch) => {
  return (
    <div style={chipStyles.wrapper}>
      {filter.eventTypes.map((eventType) => renderChip(eventActions, filter, eventType, dispatch))}
    </div>
  )
}

const renderChip = (eventActions, filter, eventType, dispatch) => {
  console.log('EventFilter.renderChip ==> eventType', eventType)
  return (
    <Chip
      key={eventType.id}
      onRequestDelete={() => dispatch(eventActions.removeFilter(filter, eventType))}
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
    filter: events.filter,
    filterSearchField: events.filter.filterSearchField
  }
}

export default connect(mapStateToProps)(EventFilter)
