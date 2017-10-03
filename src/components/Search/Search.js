import React from 'react'
import { connect } from 'react-redux'
import AutoComplete from 'material-ui/AutoComplete'
import CreateIncident from './CreateIncident'
import SearchResults from './SearchResults'
import * as ticketActions from '../../actions/ticketActions'
import * as incidentActions from '../../actions/incidentActions'
import FlatButtonStyled from '../elements/FlatButtonStyled'

export const Search = ({dispatch, queryString, dataSource, filteredDataSource}) => {
    return <div>
                <CreateIncident />
                <FlatButtonStyled
                    label='Refresh'
                    primary={true}
                    onTouchTap={() => dispatch(incidentActions.fetchIncidents())}
                />
                <br />
                <AutoComplete
                    hintText = 'e.g. Ticket ID, IM, Title, Owning Services ...'
                    searchText = {queryString}
                    dataSource = {dataSource}
                    onUpdateInput = {(input) => dispatch(ticketActions.updateTicketQuery(input))}
                    floatingLabelText = 'Incident Search'
                    fullWidth = {true}
                />
                <br />
                <p />
                <SearchResults query={filteredDataSource} />
            </div>
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