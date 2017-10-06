import React from 'react'
import { List } from 'material-ui'
import SearchResult from './SearchResult'

export const SearchResults = ({query, engagementActions}) => {
    return (
            <List>
                {query.map(ticket => <SearchResult
                        key={ticket.originId}
                        ticket={ticket}
                        engagementActions={engagementActions}
                    />)}
            </List>
    )
}

export default SearchResults