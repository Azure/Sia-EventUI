'use strict'
import { expect } from 'chai'
import {
  Events,
  ConnectedEvent
} from 'components/Timeline/Event/Events'

const eventZero = {
  eventTypeId: 0,
  data: {
    displayText: 'User displayText',
    someField: ''
  }
}

const eventOne = {
  eventTypeId: 100,
  data: {
    displayText: 'User displayText',
    someField: ''
  }
}

const eventTwo = {
  eventTypeId: 100,
  data: {
    displayText: 'User displayText',
    someField: ''
  }
}

const eventThree = {
  eventTypeId: 1,
  data: {
    displayText: 'User displayText',
    someField: 'User data here'
  }
}

const eventFour = {
  eventTypeId: 2,
  data: {
    displayText: 'User displayText',
    someField: 'User data here'
  }
}

const eventFive = {
  eventTypeId: 3
}

const eventSix = {
  eventTypeId: 3,
  data: {
    someField: 'User data here'
  }
}

const eventSeven = {
  eventTypeId: 3,
  data: {
    displayText: '',
    someField: 'User data here'
  }
}

const eventEight = {
  eventTypeId: 4,
  data: {
    someField: 'User data here'
  }
}

const eventNine = {
  eventTypeId: 5,
  data: {
    displayText: '',
    someField: 'User data here'
  }
}

const eventTen = {
  eventTypeId: 100
}

const events = [eventZero, eventOne, eventTwo, eventThree, eventFour,
  eventFive, eventSix, eventSeven, eventEight, eventNine, eventTen]

const ticketId = '2'
const incidentId = null

describe('Events', function test () {
  beforeEach(() => {
    this.output = Events({events, ticketId, incidentId})
  })

  it('Should return a div containing an array of Events', () => {
    expect(this.output.type).to.equal('div')
    expect(this.output.props.children[0].type).to.equal(ConnectedEvent)
    expect(this.output.props.children[10].type).to.equal(ConnectedEvent)
    expect(this.output.props.children[11]).to.not.exist
  })

  it('Should return the right ticketId', () => {
    expect(this.output.props.children[0].props.ticketId).to.equal(ticketId)
  })
})
