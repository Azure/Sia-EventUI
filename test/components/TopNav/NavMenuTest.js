'use strict'
import { expect } from 'chai'
import React from 'react'
import { shallow } from 'enzyme'
require('test/helpers/configureEnzyme')
import { NavMenu, mapStateToProps } from 'components/TopNav/NavMenu'
import NotificationsNone from 'material-ui/svg-icons/social/notifications-none'
import IconButton from 'material-ui/IconButton'
import MenuItem from 'material-ui/MenuItem'
import IconMenu from 'material-ui/IconMenu'
import NavigationMenu from 'material-ui/svg-icons/navigation/menu'
import { Link } from 'react-router-dom'

function mockDispatch (object) { }

function setup() {
  return shallow(<NavMenu dispatch={mockDispatch} ticketIds={['1111', '2222', '3333']}/>)
}

describe('NavMenu', function test () {
  beforeEach( () => {
    this.wrapper = setup()
  })

  it('Should render an IconMenu with an icon button', () => {
    expect(this.wrapper.type()).to.equal(IconMenu)
    expect(this.wrapper.props().iconButtonElement.type).to.equal(IconButton)
  })

  it('Should render an Incident Search link', () => {
    let link = this.wrapper.props().children[0]

    expect(link.type).to.equal(MenuItem)
    expect(link.props.primaryText).to.equal('Incident Search')
    expect(link.props.containerElement.type).to.equal(Link)
    expect(link.props.containerElement.props.to).to.equal('/search')
  })

  it('Should render an Events for All Incidents link', () => {
    let link = this.wrapper.props().children[1]

    expect(link.type).to.equal(MenuItem)
    expect(link.props.primaryText).to.equal('Events for All Incidents')
    expect(link.props.containerElement.type).to.equal(Link)
    expect(link.props.containerElement.props.to).to.equal('/events')
  })

  it('Should render a log out link', () => {
    let link = this.wrapper.props().children[8]

    expect(link.type).to.equal(MenuItem)
    expect(link.props.primaryText).to.equal('LogOut')
  })

  it('Should render links to previously visited tickets', () => {
    let links = this.wrapper.props().children[6]

    expect(links[0].props.containerElement.props.to).to.equal('/tickets/1111')
    expect(links[1].props.containerElement.props.to).to.equal('/tickets/2222')
    expect(links[2].props.containerElement.props.to).to.equal('/tickets/3333')
  })
})

describe('mapStateToProps', function test () {
  let state = {
    tickets: {
      map: {
        '12345': 'value',
         '67890': 'unused'
      }
    },
    events: {
      filter: {
        incidentId: 1,
        eventTypes: [0,5]
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
