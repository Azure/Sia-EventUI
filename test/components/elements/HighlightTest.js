'use strict'
import { expect } from 'chai'

import createComponent from 'test/helpers/shallowRenderHelper'

import Highlight from 'components/elements/Highlight'

describe('Highlight functional component', function () {
  context('Always', function () {
    const expectedChildren = {}
    const input = {
      children: expectedChildren
    }

    const result = createComponent(Highlight, input)

    it('Should pass forward children', function () {
      expect(result.props.children).to.equal(expectedChildren)
    })
  })

  context('When animationDelay is provided', function () {
    const input = {
      animationDelay: '30s'
    }

    const result = createComponent(Highlight, input)

    it('Should be a div with a style matching the delay', function () {
      expect(result.type).to.equal('div')
      expect(result.props.style.animationDelay).to.equal('30s')
    })
  })

  context('When animationDelay is NOT provided', function () {
    const input = {}

    const result = createComponent(Highlight, input)

    it('Should be a div with no style', function () {
      expect(result.type).to.equal('div')
      expect(result.props.style).to.be.undefined
    })
  })
})
