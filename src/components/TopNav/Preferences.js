import React from 'react'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import NavigationMenu from 'material-ui/svg-icons/navigation/menu'
import IconButton from 'material-ui/IconButton'
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right'
import Divider from 'material-ui/Divider'

import * as signalRActions from 'actions/signalRActions'

export const Preferences = (eventFilter, currentEventFilterType, dispatch) => [
  <MenuItem
    key='signalREventFilter'
    primaryText={'SignalR Event Filter Preferences:'}
  />,
  ...Object.values(signalRActions.filterTypes).map(filterType => <MenuItem
    key={filterType.value}
    checked={currentEventFilterType === filterType.value}
    primaryText={
      <div
        onClick={() => dispatch(signalRActions.updateEventFilterPreference(filterType.value, eventFilter))}
      >
        "{filterType.value}": {filterType.description}
      </div>}
  />),
  <Divider />
]

export default Preferences