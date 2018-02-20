import React from 'react'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'

export const GridSet = ({
  containerClass,
  rowClass,
  columnClass,
  mapPapers,
  mapRows,
  mapColumns,
  children
}) => {
  let key = -1
  return (
    <div className={containerClass}>
      {React.Children.map(
        children,
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

export const Grid = ({rowClass, columnClass, mapRows, mapColumns, children}) => {
  let rowKey = -1
  return React.Children.map(
    children,
    child => {
      rowKey++
      return <div className={rowClass} key={rowKey}>
        <GridRow columnClass={columnClass} mapColumns={mapColumns ? mapColumns(rowKey) : null}>
          {mapRows ? mapRows(rowKey, child) : child}
        </GridRow>
      </div>
    }
  )
}

Grid.propTypes = {
  rowClass: PropTypes.string.isRequired,
  columnClass: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired
}

export const GridRow = ({columnClass, mapColumns, children}) => {
  let columnKey = -1
  return React.Children.map(
    children,
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
