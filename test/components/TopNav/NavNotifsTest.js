'use strict'
import { expect } from 'chai'
import React from 'react'
import TestUtils from 'react-dom/test-utils'
import { NavNotifs } from '../../../src/components/TopNav/NavNotifs'
import NotificationsNone from 'material-ui/svg-icons/social/notifications-none'
import IconButton from 'material-ui/IconButton'

function mockDispatch (object) { }

function setup() {

    let renderer = TestUtils.createRenderer()
    renderer.render(<NavNotifs />)
    let output = renderer.getRenderOutput()

    return {
        output,
        renderer
    }
}

describe('NavNotifs', function test () {
    beforeEach( () => {
        const {output} = setup()
        this.output = output
    })

    it('Should render an IconButton', () => {
        expect(this.output.type).to.equal(IconButton)
    })
})