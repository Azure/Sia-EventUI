'use strict'
import { expect } from 'chai'
import React from 'react'
import createComponent from 'test/helpers/shallowRenderHelper'
import Link from 'components/elements/Link'

function setup (active) {
  let props = {
    active,
    children: []
  }

  return createComponent(Link, props)
}

describe('Link', function test () {
  beforeEach(() => {
    const activeOutput = setup(true)
    this.activeOutput = activeOutput
    const inactiveOutput = setup(false)
    this.inactiveOutput = inactiveOutput
  })

  it('Should render a span when active', () => {
    expect(this.activeOutput.type).to.equal('span')
  })

  it('Should render an anchor when inactive', () => {
    expect(this.inactiveOutput.type).to.equal('a')
  })
})
