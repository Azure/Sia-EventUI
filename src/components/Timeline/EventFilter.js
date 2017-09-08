import React from 'react'
import FlatButtonStyled from '../elements/FlatButtonStyled'

const defaultPrimary = 'All'

const filterLabels = [
  'All',
  'Active',
  'Dismissed',
  'System',
  'Manual'
]

const EventFilter = () =>  {
  return <div className="incident-EventFilter">
          {filterLabels.map(label => <FlatButtonStyled label={label} key={label} primary={label === defaultPrimary}/>)}
        </div>

}

export default EventFilter