'use strict'
import { expect } from 'chai'
import TopNav from '../../../src/components/TopNav/TopNav'
import NavMenu from '../../../src/components/TopNav/NavMenu'
import NavNotifs from '../../../src/components/TopNav/NavNotifs'
import React from 'react'
import createComponent from '../../helpers/shallowRenderHelper'
import AppBar from 'material-ui/AppBar'
import IconMenu from 'material-ui/IconMenu'

const setup = () => createComponent(TopNav)

describe('TopNav', function test () {

    beforeEach( () => {
        this.output = setup()
    })

    it('Renders an AppBar', () => {
        expect(this.output.type).to.equal(AppBar)
        expect(this.output.props.title).to.equal('SRE Incident Assistant')
    })

    it('Renders NavMenu on the left side of the AppBar', () => {
        expect(this.output.props.iconElementLeft.type).to.equal(NavMenu)
    })

    it('Renders NavNotifs on the right side of the AppBar', () => {
        expect(this.output.props.iconElementRight.type).to.equal(NavNotifs)
    })
})
