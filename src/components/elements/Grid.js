import React from 'react'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'

import WrapChildren from 'components/elements/helpers/WrapChildren'
import PassPropsToChildren from 'components/elements/helpers/PassPropsToChildren'

export const GridSet = ({
  containerClass,
  rowClass,
  columnClass,
  mapPapers,
  mapRows,
  mapColumns,
  children,
  ...props
}) => {
  let key = -1
  return (
    <div className={containerClass}>
      {React.Children.map(
        PassPropsToChildren(children, props),
        child => {
          key++
          return <Paper zDepth={2} key={key}>
            <Grid
              rowClass={rowClass}
              columnClass={columnClass}
              mapRows={mapRows ? mapRows(key) : null}
              mapColumns={mapColumns ? mapColumns(key) : null}
            >
              {mapPapers ? mapPapers(key, child) : child}
            </Grid>
          </Paper>
        }
      )}
    </div>
  )
}

export const Grid = ({rowClass, columnClass, mapRows, mapColumns, children, ...props}) => React.Children.map(
  PassPropsToChildren(children, props),
  (child) => WrapChildren(
    child,
    (grandChild, index) => {
      const newGrandChild = mapRows ? mapRows(index, grandChild) : grandChild
      return newGrandChild
        ? <div className={rowClass} key={index}>
          <GridRow columnClass={columnClass} mapColumns={mapColumns ? mapColumns(index) : null}>
            {newGrandChild}
          </GridRow>
        </div>
        : null
    }
  )
)

Grid.propTypes = {
  rowClass: PropTypes.string.isRequired,
  columnClass: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired
}

export const GridRow = ({columnClass, mapColumns, children, ...props}) => {
  let columnKey = -1
  return React.Children.map(
    PassPropsToChildren(children, props),
    child => {
      columnKey++
      return <div className={columnClass} key={columnKey}>
        {mapColumns ? mapColumns(columnKey, child) : child}
      </div>
    }
  )
}

GridRow.propTypes = {
  columnClass: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired
}

export default Grid
