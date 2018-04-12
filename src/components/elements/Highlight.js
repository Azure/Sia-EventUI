import React from 'react'

export const Highlight = ({
  animationDelay,
  animationName = 'yellowfade',
  animationDuration = '30s',
  children
}) => <div style={animationDelay && {
  animationDelay,
  animationName,
  animationDuration
}}>
  {children}
</div>

export default Highlight
