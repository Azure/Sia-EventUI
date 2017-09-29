import React from 'react'
import { GridSet } from './Grid'
import IconButtonStyled from '../elements/IconButtonStyled'
import CodeIcon from 'material-ui/svg-icons/action/code'
import * as expandSectionActions from '../../actions/expandSectionActions'

export const CollapsibleGridSet = (containerClass, rowClass, columnClass, children, collapseNames, collapseState, dispatch) => {
    let collapseKey = 0
    let collapseStatus = collapseNames.map(name => collapseState[name])
    return GridSet (containerClass, rowClass, columnClass, children.map(child => {
        let currentChild = collapseStatus[collapseKey] ? child.slice(0,1) : child
        currentChild[0][0].push(
            (key) =>
            <IconButtonStyled
                tooltip="Collapse/expand section"
                onTouchTap={() => {
                    debugger
                    dispatch(expandSectionActions.toggleCollapse(collapseNames[collapseKey]))}
                }
                key={key}
            >
                <CodeIcon />
            </IconButtonStyled>
        )
        collapseKey++
        return currentChild
    }))
}

export default CollapsibleGridSet