'use strict'
import { expect } from 'chai'
import React from 'react'
import TestUtils from 'react-dom/test-utils'
import { NavMenu } from '../../../src/components/TopNav/NavMenu'
import NotificationsNone from 'material-ui/svg-icons/social/notifications-none'
import IconButton from 'material-ui/IconButton'
import MenuItem from 'material-ui/MenuItem'
import IconMenu from 'material-ui/IconMenu'
import NavigationMenu from 'material-ui/svg-icons/navigation/menu'
import { Link } from 'react-router-dom'

function mockDispatch (object) { }

function setup() {
    let props = {
        dispatch: mockDispatch,
        alias: 'testAlias'
    }

    let renderer = TestUtils.createRenderer()
    renderer.render(<NavMenu {...props}/>)
    let output = renderer.getRenderOutput()

    return {
        output,
        renderer
    }
}

describe('NavMenu', function test () {
    beforeEach( () => {
        const {output} = setup()
        this.output = output
    })

    it('Should render an IconMenu with an icon button', () => {
        expect(this.output.type).to.equal(IconMenu)
        expect(this.output.props.iconButtonElement.type).to.equal(IconButton)
    })

    it('Should render the user\'s alias as a menuitem', () => {
        expect(this.output.props.children[0].type).to.equal(MenuItem)
        expect(this.output.props.children[0].props.primaryText.type).to.not.exist
        expect(this.output.props.children[0].props.primaryText).to.equal('testAlias')
    })

    it('Should render an Incident Search link', () => {
        expect(this.output.props.children[1].type).to.equal(MenuItem)
        expect(this.output.props.children[1].props.primaryText.type).to.equal(Link)
        expect(this.output.props.children[1].props.primaryText.props.to).to.equal('/')
    })

    it('Should render a log out link', () => {
        expect(this.output.props.children[2].type).to.equal(MenuItem)
        expect(this.output.props.children[2].props.primaryText.type).to.equal(Link)
        expect(this.output.props.children[2].props.primaryText.props.to).to.equal('/')
        expect(this.output.props.children[2].props.primaryText.props.onClick).to.exist
    })
})
