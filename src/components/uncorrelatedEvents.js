import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import EventFilter from 'components/Timeline/EventFilter'
import Footer from 'components/Timeline/EventFooter'
import Events from 'components/Timeline/Events'
import moment from 'moment'

import { fetchUncorrelatedEvents } from 'actions/eventActions';
import { fetchEventTypes } from 'actions/eventTypeActions';
import * as filterActions from 'actions/filterActions'
import TimePicker from 'material-ui/TimePicker'
import DatePicker from 'material-ui/DatePicker'
import { ActionTimeline, FlatButton } from 'material-ui';

class uncorrelatedEvents extends Component {
    static propTypes = {
        events: PropTypes.object.isRequired,
        filters: PropTypes.object,
        eventTypes: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired
    }

    componentDidMount(){
        const { filters, dispatch } = this.props
        const newFilter = Object.assign({}, filters, {incidentId : null})
        dispatch(filterActions.clearFilterIncidentId(newFilter))
    }
    constructor(props){
        super(props)
        this.state = {startDate: null, startTime: null, endDate: null, endTime: null}
    }

    render() {
        const { filters, events, dispatch, eventTypes, history } = this.props
        return (
            < div >
                <DatePicker
                    hintText='Select a start date'
                    onChange = {(event, date) => {
                        this.setState({startDate : moment(date).format('YYYY-MM-DD')})
                }}
                />
                <TimePicker
                    format='24hr'
                    hintText='Select a start time'
                    onChange = {(event, time) => {
                        this.setState({startTime : moment(time).format('THH:mm:ss')})
                    }}
                />
                <DatePicker
                    hintText='Select an end date' 
                    onChange = {(event, date) => {
                        this.setState({endDate : moment(date).format('YYYY-MM-DD')})
                    }}
                />
                <TimePicker
                    format='24hr'
                    hintText='Select an end time'
                    onChange = {(event, time) => {
                        this.setState({endTime : moment(time).format('THH:mm:ss')})
                    }}
                />
                <FlatButton
                    label='submit'
                    primary={true}
                    onClick={() => this.loadUncorrelatedEvents()}
                />
                <EventFilter history={history} eventTypes={eventTypes} />
                <Events events={events.pageList} ticketId={null} incidentId={null} />
                <Footer pagination={events} dispatch={dispatch} />
            </div >
        )
    }

    loadUncorrelatedEvents = () => {
        const { dispatch, filters, history } = this.props
        const{startDate, startTime, endDate, endTime} = this.state
        const start = (startDate && startTime) ? startDate + startTime: null
        const end = (endDate && endTime)? endDate + endTime: null
        console.log(start + "**" + end)
        const newFilter = (start && end)? Object.assign(...filters, {startTime: start, endTime: end}): filters
        dispatch(filterActions.synchronizeFilters(newFilter, null, null, history))
    }
}



export const mapStateToProps = (state, ownProps) => {
    const { events } = state
    return {
        ...ownProps,
        events: events.pages,
        filters: events.filter,
        eventTypes: state.eventTypes.records,
        dispatch: state.dispatch
    }
}

export default connect(mapStateToProps)(uncorrelatedEvents)