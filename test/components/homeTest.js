'use strict'
import { expect } from 'chai'
import React from 'react'
import createComponent from 'test/helpers/shallowRenderHelper'
import GetMockStore from 'test/helpers/mockReduxStore'
import { Home, mapStateToProps } from 'components/Home'

const setup = (props, children) => createComponent(Home, props, children)

const children = <div />

const noTicketState = { ticket: undefined }

const ticketState = { ticket: {
  originId: '5507',
  lastRefresh: '2017-12-29T20:19:32.407Z'
}}

describe('Home Container Component', function () {
  it('Should return nothing if no tickets', function () {
    const noTicketsExistState = setup(noTicketState, children)
    expect(noTicketsExistState).to.be.undefined
  })
  it('Should redirect to most recent ticket if there are tickets', function () {
    const ticketsExistState = setup(ticketState, children)
    expect(ticketsExistState.props.to).to.equal('/tickets/5507')
  })
})

describe('home mapStateToProps', function test () {
  it('should return null if no tickets and fresh state', () => {
    const noTicketsExistState = { tickets: null }

    expect(mapStateToProps(noTicketsExistState).ticket).to.be.undefined
  })
  it('should return null if no tickets and reloaded state', () => {
    const noTicketsExistState = {
      tickets: {
        map: {
          _persist: {
            version: -1,
            rehydrated: true
          }
        }
      }}

    expect(mapStateToProps(noTicketsExistState).ticket).to.be.undefined
  })
  it('should return most recent ticket', () => {
    const ticketsExistState = {
      tickets: {
        map: {
          '5507': {
            originId: '5507',
            lastRefresh: '2017-12-29T20:19:32.407Z'
          },
          '5519': {
            originId: '5519',
            lastRefresh: '2017-12-29T20:19:01.451Z'
          },
          _persist: {
            version: -1,
            rehydrated: true
          }
        }
      }}

    expect(mapStateToProps(ticketsExistState).ticket).to.exist
    expect(mapStateToProps(ticketsExistState).ticket.originId).to.equal('5507')
  })
})
