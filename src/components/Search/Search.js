import React from 'react'
import CreateIncident from './CreateIncident'

export const Search = ({history, incidentActions}) => {
    return <CreateIncident history={history} incidentActions={incidentActions} />
}

export default Search