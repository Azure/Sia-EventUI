'use strict'
import { expect } from 'chai'
import React from 'react'
import createComponent from 'test/helpers/shallowRenderHelper'
import { Event, mapStateToEventProps, animationDelayAsSecondsString } from 'components/Timeline/Event'
import BootstrapPlaybook from 'components/Timeline/Playbook/BootstrapPlaybook'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import { DateTime, Duration } from 'luxon'
import timeFormattedToMultipleZones from 'helpers/timeFormattedToMultipleZones'

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
      expect(parseInt(actualString.slice(0, -1))).to.be.within(-12, -9)
      expect(actualString.slice(-1)).to.equal('s')
    })
  })

  describe('#timeFormattedToMultipleZones', () => {
    it('defaults to displaying time in Pacific, India Standard, and UTC', () => {
      const time = DateTime.utc(1970, 1, 1, 0, 0)
      const expected = '1969-12-31 16:00:00 PT; 1970-01-01 05:30:00 IST, 00:00:00 UTC'

      expect(timeFormattedToMultipleZones(time)).to.eql(expected)
    })
  })
})
