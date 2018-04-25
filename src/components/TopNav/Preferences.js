import React from 'react'
import { connect } from 'react-redux'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import { zones } from 'helpers/timeFormattedToMultipleZones'

import * as signalRActions from 'actions/signalRActions'
import * as timePreferencesActions from 'actions/timePreferencesActions'

export const EventFilterPreferences = ({
  currentEventFilterObject,
  currentEventFilterPreference,
  dispatch,
  selectedTimezones
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
  <Menu multiple onChange={onTimezoneClick(dispatch)} value={selectedTimezones}>
    {zones.map(zone => (
      <MenuItem
        key={zone.ianaZone}
        checked={isTimezoneChecked(zone.ianaZone, selectedTimezones)}
        primaryText={zone.shortname}
        value={zone.ianaZone}
      />
    ))}
  </Menu>
</div>

const onTimezoneClick = (dispatch) => (event, value) =>
  dispatch(timePreferencesActions.setDisplayTimezones(value))

const isTimezoneChecked = (ianaZoneName, selectedTimezones) =>
  selectedTimezones &&
  selectedTimezones.includes &&
  selectedTimezones.includes(ianaZoneName)

export const mapStateToEventFilterPreferencesProps = (state) => ({
  currentEventFilterObject: state.events.filter,
  currentEventFilterPreference: state.signalR.filterPreferences.eventFilterType,
  selectedTimezones: state.timePreferences.displayTimezones
})

export const ConnectedEventFilterPreferences = connect(mapStateToEventFilterPreferencesProps)(EventFilterPreferences)

export const SelectEventFilterPreference = (dispatch, currentEventFilter) =>
(event, value) => dispatch(signalRActions.updateEventFilterPreference(value, currentEventFilter))

export const Preferences = () => <div>
  <ConnectedEventFilterPreferences />
</div>

export default Preferences
