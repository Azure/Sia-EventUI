import React from 'react'
import { connect } from 'react-redux'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'

import * as signalRActions from 'actions/signalRActions'

export const EventFilterPreferences = ({
  currentEventFilterObject,
  currentEventFilterPreference,
  dispatch
}) => <div style={{ padding: '16px' }}>
  <h3 key='signalREventFilter'>Event Filter Preferences:</h3>
  <RadioButtonGroup
    name='Event Filter Preferences'
    onChange={SelectEventFilterPreference(dispatch, currentEventFilterObject)}
    defaultSelected={currentEventFilterPreference}
  >
    {Object.values(signalRActions.filterTypes)
      .map(filterType =>
        <RadioButton
          style={{ padding: '8px' }}
          key={filterType.value}
          value={filterType.value}
          label={filterType.description}
        />
      )
    }
  </RadioButtonGroup>

  <h3 key='timePreferences'>Time Preferences:</h3>
  Display times in timezone:
  <DropDownMenu
    >
    <MenuItem primaryText={'UTC'} value={'UTC'} />
    <MenuItem primaryText={'Pacific Time'} value={'America/Los_Angeles'} />
    <MenuItem primaryText={'India Standard Time'} value={'Asia/Kolkata'} />
  </DropDownMenu>
</div>

export const mapStateToEventFilterPreferencesProps = (state) => ({
  currentEventFilterObject: state.events.filter,
  currentEventFilterPreference: state.signalR.filterPreferences.eventFilterType
})

export const ConnectedEventFilterPreferences = connect(mapStateToEventFilterPreferencesProps)(EventFilterPreferences)

export const SelectEventFilterPreference = (dispatch, currentEventFilter) =>
(event, value) => dispatch(signalRActions.updateEventFilterPreference(value, currentEventFilter))

export const Preferences = () => <div>
  <ConnectedEventFilterPreferences />
</div>

export default Preferences
