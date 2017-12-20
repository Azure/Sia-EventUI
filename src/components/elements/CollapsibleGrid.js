import React from 'react'
import { GridSet } from './Grid'
import IconButtonStyled from '../elements/IconButtonStyled'
import ArrowDropDownIcon from 'material-ui/svg-icons/navigation/arrow-drop-down'
import ArrowDropDownCircleIcon from 'material-ui/svg-icons/navigation/arrow-drop-down-circle'
import * as expandSectionActions from '../../actions/expandSectionActions'

const dispatchOnTouchTap = (collapseName, dispatch) => () => dispatch(expandSectionActions.toggleCollapse(collapseName))

export const CollapsibleGridSet = (containerClass, rowClass, columnClass, children, collapseNames, collapseState, dispatch) => {
    let collapseKey = 0
    const collapseStatus = collapseNames.map(name => collapseState[name])
    return GridSet (containerClass, rowClass, columnClass, children.map(child => {
        const isCollapsed = collapseStatus[collapseKey]
        const currentChild = isCollapsed ? child.slice(0,1) : child
        const currentName = collapseNames[collapseKey]
        currentChild[0][0].push(
            (key) =>
            <IconButtonStyled
                tooltip="Collapse/expand section"
                onTouchTap={dispatchOnTouchTap(currentName, dispatch)}
                key={key}
            >
                {isCollapsed ? <ArrowDropDownCircleIcon /> : <ArrowDropDownIcon />}
            </IconButtonStyled>
        )
        collapseKey++
        return currentChild
    }))
}



export default CollapsibleGridSet