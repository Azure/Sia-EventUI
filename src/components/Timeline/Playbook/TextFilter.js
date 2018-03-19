import React, { Component } from 'react'
import { TextField } from 'material-ui';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class TextFilter extends Component {
    render() {
        return (
            <div>
                <TextField
                    hintText = 'Search'
                />
            </div>
        )
    }
}

export const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps
    }
}

export default connect(mapStateToProps)(TextFilter)