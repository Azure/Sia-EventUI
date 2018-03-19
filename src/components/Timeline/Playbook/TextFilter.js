import React, { Component } from 'react'
import { TextField } from 'material-ui';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { LoadTextFromEvent, TestConditionSet } from 'services/playbookService'

class TextFilter extends Component {
    static PropTypes = {
        events: PropTypes.object.isRequired
    }

    constructor(props){
        super(props);

        this.state = {
            value: 'Search',
        };
    }

    render() {
        return (
            <div>
                <TextField
                    hintText='Search'
                    id = 'search-field-value'
                    value = {this.state.value}
                    onChange = { this.handleChange }
                />
                <FlatButton
                    label='submit'
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

    }
}

export const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        //text: LoadTextFromEvent(event, eventType, ticket, engagement)
    }
}

export default connect(mapStateToProps)(TextFilter)