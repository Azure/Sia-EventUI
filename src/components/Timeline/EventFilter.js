import React from 'react'
import { connect } from 'react-redux'
import IconButtonStyled from '../elements/IconButtonStyled'
import ArrowDown from 'material-ui/svg-icons/navigation/arrow-downward'
import ArrowUp from 'material-ui/svg-icons/navigation/arrow-upward'
import AutoComplete from 'material-ui/AutoComplete'
import Chip from 'material-ui/Chip'
import {referenceData} from '../../services/filterService'
import * as formActions from '../../actions/formActions'
import * as eventActions from '../../actions/eventActions'


const filterTypes = referenceData.types

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

const filterSearchForm = {
  name: 'filter selection',
  field: 'input'
}


const EventFilter = ({pagination, filter, filterSearchField, dispatch}) =>  {
  
    const filterChips = filter.eventTypes ? renderChips(filter, dispatch): null
    return  (
      <div className="incident-EventFilter">
        {filterChips}
        <AutoComplete
          floatingLabelText="Filter by event type"
          filter={AutoComplete.caseInsensitiveFilter}
          dataSource={filterTypes}
          searchText={filterSearchField || ''}
          onUpdateInput={(searchText) => dispatch(formActions.updateInput(filterSearchForm.name, filterSearchForm.field, searchText))}        
          onNewRequest={
            (eventType, indexInDataSource) => {
              dispatch(eventActions.addFilter(filter, eventType))
              dispatch(formActions.clearInput(filterSearchForm.name, filterSearchForm.field))
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
    filterSearchField: state.forms[filterSearchForm.name] ? state.forms[filterSearchForm.name][filterSearchForm.field] : ''
  }
}

export default connect(mapStateToProps)(EventFilter)
