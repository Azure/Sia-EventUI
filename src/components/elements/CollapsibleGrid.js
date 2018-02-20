import React from 'react'
import { connect } from 'react-redux'
import ArrowDropDownIcon from 'material-ui/svg-icons/navigation/arrow-drop-down'
import ArrowDropDownCircleIcon from 'material-ui/svg-icons/navigation/arrow-drop-down-circle'

import { GridSet } from 'components/elements/Grid'
import IconButtonStyled from 'components/elements/IconButtonStyled'
import * as expandSectionActions from 'actions/expandSectionActions'
import AppendChild from 'components/elements/helpers/AppendChild'
import PassPropsToChildren from 'components/elements/helpers/PassPropsToChildren'

const dispatchOnTouchTap = (collapseName, dispatch) => () => dispatch(expandSectionActions.toggleCollapse(collapseName))

export const CollapsibleGridSet = ({containerClass, rowClass, columnClass, children, collapseNames, collapseStatus, dispatch, ...props}) => {
  let collapseKey = 0
  return <GridSet
    containerClass={containerClass}
    rowClass={rowClass}
    columnClass={columnClass}

  >
    {PassPropsToChildren(children, props)}
  </GridSet>
}

/*
    mapRows={(sectionIndex) => (rowIndex, component) => !rowIndex //if first row
      ? AppendChild(
        component,
        <IconButtonStyled
          tooltip='Collapse/expand section'
          onTouchTap={dispatchOnTouchTap(collapseNames[sectionIndex], dispatch)}
        >
          {collapseStatus[sectionIndex] ? <ArrowDropDownCircleIcon /> : <ArrowDropDownIcon />}
        </IconButtonStyled>
      )
      : collapseStatus[sectionIndex] //is collapsed
        ? null
        : component
    }
*/

export const mapStateToCollapsibleGridSetProps = (state, ownProps) => ({
  collapseStatus: ownProps.collapseNames.map(name => state.expandSection[name]),
  ...ownProps
})

export default connect(mapStateToCollapsibleGridSetProps)(CollapsibleGridSet)
