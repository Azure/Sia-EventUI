import React from 'react'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'

export const GridSet = (containerClass, rowClass, columnClass, children) => {
    let key = 0
    return (
        <div className={containerClass}>
            {children.map(child => Grid(rowClass, columnClass, child, key++))}
        </div>
    )
}

export const Grid = (rowClass, columnClass, children, key = 0) => {
    let rowKey = 0
    return (
        <Paper zDepth={2} key={key}>
            {
                children.map(child => {
                    return Array.isArray(child)? GridRow(rowClass, columnClass, child, rowKey++) : child
                }
            )}
        </Paper>
    )
}

Grid.propTypes = {
    rowClass: PropTypes.string.isRequired,
    columnClass: PropTypes.string.isRequired,
    children: PropTypes.array.isRequired
}

export const GridRow = (rowClass, columnClass, children, rowKey = 0) => {
    let columnKey = 0
    return (
        <div className={rowClass} key={rowKey}>
            {children.map(child => {
                let localkey = 0
                return (
                    <div className={columnClass} key={columnKey++}>
                        {Array.isArray(child)? child.map(grandchild => grandchild(localkey++)) : child}
                    </div>
                )
            })}
        </div>
    )
}

GridRow.propTypes = {
    rowClass: PropTypes.string.isRequired,
    columnClass: PropTypes.string.isRequired,
    children: PropTypes.array.isRequired
}

export default Grid