import React from 'react'
import { connect } from 'react-redux'
import CreateIncident from './CreateIncident'

export const Search = () => {
    return <CreateIncident />
}

export const mapStateToProps = (state) => {
    const dataSource = Object.values(state.tickets.map)
    const filteredDataSource = (state.tickets.query && state.tickets.query.length > 0)
            ? dataSource.filter(ticket =>
                    (ticket.originId + ticket.title + ticket.owningService + ticket.imName + ticket.imAlias)
                    .toLowerCase()
                    .replace(/\s/g,'')
                    .includes(state.tickets.query.toLowerCase()))
            : dataSource
    return {
        dataSource,
        filteredDataSource,
        queryString: state.tickets.query,
        ticketSystem: state.tickets.systems[1]
    }
}

export default connect(mapStateToProps)(Search)