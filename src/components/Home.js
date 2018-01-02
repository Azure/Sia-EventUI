import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'



export const Home = ({ ticket }) => {
    if (ticket && ticket.originId) {
        return <Redirect to={`/tickets/${ticket.originId}`} />
    }
    return <Redirect to={'/search'} />
}

export const mapStateToProps = (state) => {
    // this gross thing finds all actual tickets, omitting the refresh metadata, and then picks the most recently visited one out
    // the sort function works because the dates are UTC and thus lexically sortable to start with
    return {
        ticket: (state.tickets && state.tickets.map) ? Object.values(state.tickets.map).filter(ele => { return ele.lastRefresh })
                                        .sort((a, b) => { return (a.lastRefresh > b.lastRefresh) ? -1 : 1 })[0]
                                        : undefined
    }
}

export default connect(mapStateToProps)(Home)

