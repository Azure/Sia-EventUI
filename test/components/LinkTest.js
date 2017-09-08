'use strict'
import { expect } from 'chai'
import React from 'react'
import TestUtils from 'react-dom/test-utils'
import Link from '../../src/components/Link'


function setup(active) {
    let props = {
        active,
        children: []
    }
    let renderer = TestUtils.createRenderer()
    renderer.render(<Link {...props}/>)
    let output = renderer.getRenderOutput()

    return {
        output,
        renderer
    }
}

describe('Link', function test () {
    beforeEach( () => {
        const activeOutput = setup(true).output
        this.activeOutput = activeOutput
        const inactiveOutput = setup(false).output
        this.inactiveOutput = inactiveOutput
    })

    it('Should render a span when active', () => {
        expect(this.activeOutput.type).to.equal('span')
    })

    it('Should render an anchor when inactive', () => {
        expect(this.inactiveOutput.type).to.equal('a')
    })
})