'use strict'
import { expect } from 'chai'
import { Redirect } from 'react-router'

import createComponent from 'test/helpers/shallowRenderHelper'
import { GetMockDispatch, GetDispatchRecorder } from 'test/helpers/mockDispatch'

import { IncidentRedirect, mapStateToProps, IncidentRedirectComponentDidMount } from 'components/Incident/IncidentRedirect'
import LoadingMessage from 'components/elements/LoadingMessage'



const setup = (props, children) => createComponent(IncidentRedirect, props, children)

describe('Incident Redirect', function () {
  describe('Component', function () {
    describe('ComponentDidMount', function () {
      it('Should attempt to fetch incident by incident id if ticketid is not known', function () {
        let mockDispatchRecorder = GetDispatchRecorder()

        const testProps = {
          ticketId: null,
          incidentId: 2
        }
        const mockDispatch = GetMockDispatch(mockDispatchRecorder)

        IncidentRedirectComponentDidMount({...testProps, dispatch: mockDispatch})

        expect(mockDispatchRecorder.action.type).to.equal('REQUEST_INCIDENT')
      })

      it('Should not attempt to fetch incident by incident id if ticketid is known', function () {
        const mockDispatchRecorder = {
          action: null
        }

        const testProps = {
          ticketId: 1,
          incidentId: 2
        }

        const mockDispatch = GetMockDispatch(mockDispatchRecorder)

        IncidentRedirectComponentDidMount({...testProps, dispatch: mockDispatch})

        expect(mockDispatchRecorder.action).to.be.null
      })
    })

    describe('Render', function () {
      it('Should render a redirect to the appropriate ticket endpoint if ticketId is known', function () {
        const testProps = {
          ticketId: 1
        }

        const testObject = setup(testProps)

        expect(testObject.type).to.equal(Redirect)
        expect(testObject.props.to).to.equal('/tickets/1')
      })

      it('Should render a loading message if ticketId is not known and incident is fetching', function () {
        const testProps = {
          ticketId: null,
          incidentIsFetching: true
        }

        const testObject = setup(testProps)

        expect(testObject.type).to.equal(LoadingMessage)
        expect(testObject.props.message).to.equal('Loading incident information')
      })

      it('Should render an error message if ticketId is not known and incident is not fetching', function () {
        const testProps = {
          ticketId: null,
          incidentIsFetching: false
        }

        const testObject = setup(testProps)

        expect(testObject.type).to.equal('div')
        expect(testObject.props.children).to.equal('Unexpected error or interruption when loading incident')
      })
    })
  })

  describe('mapStateToProps', function () {
    describe('incidentId', function () {
      it('Should determine incidentId based on ownProps', function () {
        const inputOwnProps = {
          match: {
            params: {
              incidentId: 50
            }
          }
        }

        expect(mapStateToProps(null, inputOwnProps).incidentId).to.equal(50)
      })

      it('Should determine incidentIsFetching based on state and ownProps', function () {
        const inputOwnProps = {
          match: {
            params: {
              incidentId: 50
            }
          }
        }

        const inputStateFetching = {
          incidents: {
            fetchingByIncidentId: [50]
          }
        }

        const inputStateNotFetching = {
          incidents: {
            fetchingByIncidentId: []
          }
        }

        expect(mapStateToProps(inputStateFetching, inputOwnProps).incidentIsFetching).to.be.true
        expect(mapStateToProps(inputStateNotFetching, inputOwnProps).incidentIsFetching).to.be.false
      })

      it('Should determine ticketId based on state and ownProps', function () {
        const inputOwnProps = {
          match: {
            params: {
              incidentId: 50
            }
          }
        }

        const inputState = {
          incidents: {
            map: {
              50: {
                primaryTicket: {
                  originId: '100'
                }
              }
            }
          }
        }

        expect(mapStateToProps(inputState, inputOwnProps).ticketId).to.equal('100')
      })
    })
  })
})
