import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import IconButtonStyled from '../elements/IconButtonStyled'
import FilterChips from '../elements/FilterChips'
import ArrowDown from 'material-ui/svg-icons/navigation/arrow-downward'
import ArrowUp from 'material-ui/svg-icons/navigation/arrow-upward'
import AutoComplete from 'material-ui/AutoComplete'
import * as formActions from '../../actions/formActions'
import * as eventActions from '../../actions/eventActions'
import * as filterActions from '../../actions/filterActions'

export const dataSourceConfig = {
  text: 'name',
  value: 'id'
}

export const chipStyles = {
  chip: {
    margin: 4
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap'
  }
}

export const filterSearchForm = {
  name: 'filter selection',
  field: 'input'
}


const EventFilter = ({pagination, filter, filterSearchField, filterTypes, dispatch, history}) =>  {
  return  (
    <div className="incident-EventFilter">
      <FilterChips
        selectSpecificFilter={'eventTypes'}
        lookupFilterObject={'events.filter'}
        recordLookup={'eventTypes.records'}
        onRequestDelete={(filter, id) => () => dispatch(filterActions.removeFilter(history, 'eventTypes')(filter,id))}
      />
      <AutoComplete
        floatingLabelText="Filter by event type"
        filter={AutoComplete.caseInsensitiveFilter}
        dataSource={filterTypes}
        searchText={filterSearchField || ''}
        onUpdateInput={(searchText) => dispatch(formActions.updateInput(filterSearchForm.name, filterSearchForm.field, searchText))}
        onNewRequest={
          (eventType) => {
            dispatch(filterActions.addFilter(history)(filter, eventType))
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
  
  const mapStateToProps = (state, ownProps) => {
  const { events } = state
  return {
    ...ownProps,
    pagination: events.pages,
    filter: events.filter,
    filterSearchField: state.forms[filterSearchForm.name] ? state.forms[filterSearchForm.name][filterSearchForm.field] : '',
    filterTypes: ownProps.eventTypes ? Object.values(ownProps.eventTypes) : []
  }
}

export default withRouter(connect(mapStateToProps)(EventFilter))
