import React from 'react'

const PassPropsToChildren = (children, props) => React.Children.map(
  children,
  child => React.cloneElement(child, props)
)

export default PassPropsToChildren