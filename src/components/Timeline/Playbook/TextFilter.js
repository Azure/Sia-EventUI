import React, { Component } from 'react'
import { TextField } from 'material-ui';
import { FlatButton } from 'material-ui'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { LoadTextFromEvent, TestConditionSet } from 'services/playbookService'
import * as filterActions from 'actions/filterActions'

class TextFilter extends Component {
    static propTypes = {
        history: PropTypes.object.isRequired,
        filters: PropTypes.object
    }

    constructor(props){
        super(props);

        this.state = {
            value: '',
        };
    }

    render() {
        return (
            <div>
                <br/>
                <TextField
                    hintText='Search'
                    id = 'search-field-value'
                    value = {this.state.value}
                    onChange = { this.handleChange }
                />
                <FlatButton
                    label='Search'
                    primary
                    onClick={() => this.submitSearch()}
                />
            </div>
        )
    }

    handleChange = (event) => {
        this.setState({
            value: event.target.value,
        });
    };

    submitSearch(){
        const{ filters, dispatch, history } = this.props
        const newFilter = Object.assign({}, filters, { DataSearch : this.state.value })
        dispatch(filterActions.synchronizeFilters(newFilter, null, null, history))
    }
}

export const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        dispatch: state.dispatch,
        filters: state.events.filter
    }
}

export default connect(mapStateToProps)(TextFilter)