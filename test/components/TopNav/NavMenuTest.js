'use strict'
import { expect } from 'chai'
import React from 'react'
import { shallow } from 'enzyme'
require('test/helpers/configureEnzyme')
import { NavMenu, ticketMenuLinks, mapStateToProps } from 'components/TopNav/NavMenu'
import MenuLink from 'components/elements/MenuLink'
import NotificationsNone from 'material-ui/svg-icons/social/notifications-none'
import IconButton from 'material-ui/IconButton'
import MenuItem from 'material-ui/MenuItem'
import IconMenu from 'material-ui/IconMenu'
import { Link } from 'react-router-dom'
require('test/helpers/configureEnzyme')

const mockDispatch = () => null

function setup () {
  const ticketInfo = [
    { id: '1111', title: 'title' },
    { id: '2222', title: 'title' },
    { id: '3333', title: 'title' }
  ]

  return shallow(<NavMenu dispatch={mockDispatch} ticketInfo={ticketInfo} />)
}

describe('NavMenu', function test () {
  const testObject = setup()

  const expectMenuLink = (testObject, expectedPrimaryText, expectedLink) => {
    expect(testObject.type).to.equal(MenuLink)
    expect(testObject.props.primaryText).to.equal(expectedPrimaryText)
    expect(testObject.props.route).to.equal(expectedLink)
  }

  it('Should render an IconMenu with an icon button', function () {
    expect(testObject.type()).to.equal(IconMenu)
    expect(testObject.props().iconButtonElement.type).to.equal(IconButton)
  })

  it('Should render an Incident Search link', function () {
    const link = testObject.props().children[0]

    expectMenuLink(link, 'Incident Search', '/search')
  })

  it('Should render an Events for All Incidents link', function () {
    const link = testObject.props().children[1]

    expectMenuLink(link, 'Events for All Incidents', '/events')
  })

  it('Should render a Preferences link', function () {
    const link = testObject.props().children[3]

    expectMenuLink(link, 'Preferences', '/preferences')
  })

  it('Should render a log out link', function () {
    const link = testObject.props().children[8]

    expect(link.type).to.equal(MenuItem)
    expect(link.props.primaryText).to.equal('LogOut')
  })
})

describe('ticketMenulinks', () => {
  const multipleTickets = [
    { id: 123, title: 'title' },
    { id: 456, title: 'title' }
  ]

  it('Should render nothing when there is no ticketInfo', () => {
    expect(ticketMenuLinks(null, mockDispatch)).to.equal(null)
  })

  it('Should render the expected number of menu entries', () => {
    expect(ticketMenuLinks(multipleTickets, mockDispatch))
      .to
      .have
      .lengthOf(multipleTickets.length)
  })

  it('Should render the expected number of MenuLink entities', () => {
    ticketMenuLinks(multipleTickets, mockDispatch)
      .map(item => item.type)
      .forEach(type => expect(type).to.equal(MenuLink))
  })
})

describe('mapStateToProps', function test () {
  const state = {
    tickets: {
      map: {
        '12345': { data: { title: 'title' } },
        '67890': 'unused'
      }
    },
    events: {
      filter: {
        incidentId: 1,
        eventTypes: [ 0, 5 ]
      }
    },
    signalR: {
      filterPreferences: {
        eventFilterType: 'magic'
      }
    }
  }

  const ownProps = {
    history: {},
    location: { pathname: '/tickets/4444' }
  }

  const result = mapStateToProps(state, ownProps)

  it('passes history from ownProps', () => {
    expect(result.history).to.equal(ownProps.history)
  })

  it('transforms the tickets.map into ticketInfo', () => {
    expect(result.ticketInfo).to.deep.include(
      { id: '12345', title: 'title' },
      { id: '67890', title: '' }
    )
  })
})
