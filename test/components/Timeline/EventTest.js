'use strict'
import { expect } from 'chai'
import React from 'react'
import createComponent from 'test/helpers/shallowRenderHelper'
import { Event, mapStateToEventProps } from 'components/Timeline/Event'
import BootstrapPlaybook from 'components/Timeline/Playbook/BootstrapPlaybook'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import { DateTime } from 'luxon';

const setup = () => {
  let props = {
    text: 'test text',
    id: 1,
    time: DateTime.local()
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
        time: DateTime.local(),
        actions: []
      }

      let eventComponent = createComponent(Event, props)
      expect(eventComponent.props.children[1].props.children[1]).to.eql(false)
    })

    it('When actions are present it displays CardText', () => {
      let props = {
        text: 'test text',
        id: 1,
        time: DateTime.local(),
        actions: ['dolphin']
      }

      let eventComponent = createComponent(Event, props)
      expect(eventComponent.props.children[1].props.children[1].type).to.eql(CardText)
    })
  })
})
