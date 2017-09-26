import { GridSet } from './Grid'

export const CollapsibleGridSet = (containerClass, rowClass, columnClass, children, collapseStatus) => {
    let collapseKey = 0
    return GridSet (containerClass, rowClass, columnClass, children.map(child => {
        let currentChild = collapseStatus[collapseKey] ? child.slice(0,1) : child
        collapseKey++
        return currentChild
    }))
}

export default CollapsibleGridSet