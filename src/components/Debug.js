import React from 'react'
import FlatButtonStyled from 'components/elements/FlatButtonStyled'
import { clearCache } from 'services/authNService'

export const Debug = () => {
  return (<div>
    <FlatButtonStyled
      label='Clear Auth Cache'
      onTouchTap={() => clearCache()}
    />
  </div>)
}

export default Debug
