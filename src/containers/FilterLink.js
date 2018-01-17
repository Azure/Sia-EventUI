import { connect } from 'react-redux'
// import { setVisibilityFilter } from 'actions'
import Link from 'components/Link'

const mapStateToProps = (state, ownProps) => {
  return {
    active: ownProps.filter === state.visibilityFilter
  }
}

// const mapDispatchToProps = (dispatch, ownProps) => {
const mapDispatchToProps = () => {
  return {
    onClick: () => {
      // dispatch(setVisibilityFilter(ownProps.filter))
    }
  }
}

const FilterLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(Link)

export default FilterLink
