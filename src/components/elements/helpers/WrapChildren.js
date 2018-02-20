import React from 'react'

export const WrapChildren = (component, wrapper) => React.cloneElement(
  component,
  {
    children: React.Children.map(
      component.props.children,
      (child, index) => wrapper(child, index)
    )
  }
)

export default WrapChildren
