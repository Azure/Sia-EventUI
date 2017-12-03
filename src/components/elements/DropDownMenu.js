import React from 'react'
import { connect } from 'react-redux'
import { addFilterOnEventType } from '../../actions/eventActions'

export const DropDownFilter = (props) => {
    const {dispatch, eventActions, options, selectedOption} = props
    return (
        <form>
            <label>
                Filtering On:
                <select
                    value={selectedOption}
                    onChange={(event) => dispatch(eventActions.addFilterOnEventType(event.target))}>
                    {options.map(o => <option value={o.name} key={o.id}>{o.name}</option>)}
                </select>
            </label>
        </form>
    )
}

const fetchAllEventTypes = (selection) => {
    console.log(selection)
  }

export const mapStateToProps = (eventActions, options, selectedOption) => (state) => {
    return {
        ...state,
        options: options,
        selectedOption: null,
        eventActions
    }
}

export default (eventActions, filterOptions, selectedOption) => connect(mapStateToProps(eventActions, filterOptions, selectedOption))(DropDownFilter)