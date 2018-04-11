'use strict'
import { expect } from 'chai'
import React from 'react'
import createComponent from 'test/helpers/shallowRenderHelper'
import { Event, mapStateToEventProps, animationDelayAsSecondsString } from 'components/Timeline/Event'
import BootstrapPlaybook from 'components/Timeline/Playbook/BootstrapPlaybook'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import { DateTime, Duration } from 'luxon'

const setup = () => {
  let props = {
    text: 'test text',
    id: 1,
    time: DateTime.utc()
  }

  return createComponent(Event, props)
}

describe('Event', function test () {
  beforeEach(() => {
    this.output = setup()
  })

  it('Should render a div containing BootstrapPlaybook and a Card', () => {
    expect(this.output.type).to.equal('div')
    expect(this.output.props.children[0].type).to.equal(BootstrapPlaybook)
    expect(this.output.props.children[1].type).to.equal(Card)
  })

  describe('Card', () => {
    it('When there is no action it does not display CardText', () => {
      let props = {
        text: 'test text',
        id: 1,
        time: DateTime.utc(),
        actions: []
      }

      let eventComponent = createComponent(Event, props)
      expect(eventComponent.props.children[1].props.children[1]).to.eql(false)
    })

    it('When actions are present it displays CardText', () => {
      let props = {
        text: 'test text',
        id: 1,
        time: DateTime.utc(),
        actions: ['dolphin']
      }

      let eventComponent = createComponent(Event, props)
      expect(eventComponent.props.children[1].props.children[1].type).to.eql(CardText)
    })
  })

  describe('#animationDelayAsSecondsString', () => {
    it('returns the appropriate number of seconds', () => {
      const mockEvent = {
        timeReceived: DateTime.utc().minus(Duration.fromObject({ seconds: 9 }))
      }

      const actualString = animationDelayAsSecondsString(mockEvent)
      expect(parseInt(actualString.slice(0, -1))).to.be.within(-11, -9)
      expect(actualString.endsWith('s')).to.be.true()
    })
  })
})
