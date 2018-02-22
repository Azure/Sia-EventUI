import React from 'react'

const PassPropsToChildren = (children, props) => React.Children.map(
  children,
  child => child.type && child.type !== 'div'
    ? React.cloneElement(child, props)
    : React.cloneElement(
      child,
      {
        children: PassPropsToChildren(
          child.props.children,
          props
        )
      }
    )
)

export default PassPropsToChildren
