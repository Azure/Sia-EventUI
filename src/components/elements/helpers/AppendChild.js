import React from 'react'

const AppendChild = (component, childToAppend) => React.cloneElement(
  component,
  {
    children: component.props.children
      ? Array.isArray(component.props.children)
        ? component.props.children.concat(childToAppend)
        : [component.props.children, childToAppend]
      : childToAppend
  }
)

export default AppendChild