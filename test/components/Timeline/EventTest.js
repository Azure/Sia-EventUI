'use strict'
import { expect } from 'chai';
import React from 'react'
import TestUtils from 'react-dom/test-utils'
import createComponent from '../../helpers/shallowRenderHelper'
import Event from '../../../src/components/Timeline/Event'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import moment from 'moment'

function setup() {
    let props = {
        text: 'test text',
        id: 1,
        time: moment()
    }
    let renderer = TestUtils.createRenderer()
    renderer.render(<Event {...props}/>)
    let output = renderer.getRenderOutput()

    return {
        output,
        renderer,
        props
    }
}

describe('Event', function test () {
    beforeEach( () => {
        const { output } = setup()
        this.output = output
    })

    it('Should render a card', () => {
        expect(this.output.type).to.equal(Card)
        expect(this.output.props.children[0].type).to.equal(CardHeader)
        expect(this.output.props.children[1].type).to.equal(CardText)
    })
})