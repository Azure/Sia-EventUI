import React from 'react'

export const Highlight = ({
  animationDelay,
  animationName = 'yellowfade',
  animationDuration = '30s',
  children
}) => <div style={({
    animationDelay,
    animationName,
    animationDuration
  })}
>
  {children}
</div>