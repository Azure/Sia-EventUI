import React from 'react'
import FlatButtonStyled from '../elements/FlatButtonStyled'
import IconButtonStyled from '../elements/IconButtonStyled'
import ArrowDown from 'material-ui/svg-icons/navigation/arrow-downward'
import ArrowUp from 'material-ui/svg-icons/navigation/arrow-upward'
import * as eventActions from '../../actions/eventActions'
import AutoComplete from 'material-ui/AutoComplete'
import MockEventTypes, { mockEventTypes } from '../elements/mockEventTypes'

const defaultPrimary = 'Active'

const filterLabels = [
  'Active',
  'Dismissed',
  'System',
  'Manual'
]

const filterTypes = mockEventTypes.types

const dataSourceConfig = {
  text: 'name',
  value: 'id',
}

const EventFilter = ({pagination, dispatch, eventActions}) =>  {
  return <div className="incident-EventFilter">
          {/* {filterLabels.map(label => <FlatButtonStyled label={label} key={label} primary={label === defaultPrimary}/>)} */}
          
          <AutoComplete
                    floatingLabelText="Filter by event type"
                    filter={AutoComplete.caseInsensitiveFilter}
                    dataSource={filterTypes}
                    onNewRequest={(s,i)=>dispatch(eventActions.addFilterOnEventType(s))}
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

}

export const EventFilterMenu = ({eventTypes, dispatch}) =>  {
  return <div className="incident-EventFilter">
            <form>
                <label>
                    Filtering On:
                    <select
                        value={input}
                        onChange={(event, newValue)=> dispatch(eventActions.changeEventFilter(newValue))}>
                        {options.map(o => <option value={o} key={o}>{o}</option>)}
                    </select>
                </label>
            </form>
        </div>

}

export default EventFilter