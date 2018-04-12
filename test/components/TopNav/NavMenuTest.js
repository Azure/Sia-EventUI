'use strict'
import { expect } from 'chai'
import React from 'react'
import { shallow } from 'enzyme'
import { NavMenu, mapStateToProps } from 'components/TopNav/NavMenu'
import IconButton from 'material-ui/IconButton'
import MenuItem from 'material-ui/MenuItem'
import IconMenu from 'material-ui/IconMenu'
import { Link } from 'react-router-dom'
require('test/helpers/configureEnzyme')

const mockDispatch = () => null

const setup = () => shallow(
  <NavMenu
    dispatch={mockDispatch}
    ticketIds={['1111', '2222', '3333']}
  />
)

describe('NavMenu', function test () {
  const testObject = setup()

  const expectMenuLink = (testObject, expectedPrimaryText, expectedLink) => {
    expect(testObject.type).to.equal(MenuItem)
    expect(testObject.props.primaryText).to.equal(expectedPrimaryText)
    expect(testObject.props.containerElement.type).to.equal(Link)
    expect(testObject.props.containerElement.props.to).to.equal(expectedLink)
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

  it('Should render links to previously visited tickets', function () {
    const links = testObject.props().children[6]

    expect(links[0].props.containerElement.props.to).to.equal('/tickets/1111')
    expect(links[1].props.containerElement.props.to).to.equal('/tickets/2222')
    expect(links[2].props.containerElement.props.to).to.equal('/tickets/3333')
  })
})

describe('mapStateToProps', function test () {
  const state = {
    tickets: {
      map: {
        '12345': 'value',
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

  it('transforms the tickets.map into ticketIds', () => {
    expect(result.ticketIds).to.contain('12345', '67890')
  })
})
