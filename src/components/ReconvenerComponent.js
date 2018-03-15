import siaReconvener from 'sia-reconvener'
import React from 'react'

const ReconvenerComponent = props => {
  try {
    let config = {
      clientID: "tktktktk",
      adalBaseUrl: "tktktktk",
      adalClientId: "tktktktk",
      redirectUri: "tktktktk"
    }

    let params = {
        config: config,
        incidentId: props && props.ticketId || '1',
        title: 'Schedule a reconvene for incident ' + props && props.ticketId || '1'
      }
debugger
    return siaReconvener.template(params)
  }
  catch (error) {
    // If'n the template throws an error because it doesn't have enough context
    // return null, representing an empty component
    if (error.name !== "ReferenceError") { throw error }
    return null
  }
}

export default ReconvenerComponent
