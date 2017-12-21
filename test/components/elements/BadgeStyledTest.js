'use strict'
import { expect } from 'chai'
import createComponent from '../../helpers/shallowRenderHelper'
import BadgeStyled from '../../../src/components/elements/BadgeStyled'
import Badge from 'material-ui/Badge'

const setup = (props, children) => createComponent(BadgeStyled, props, children)

describe('BadgeStyled', function () {
    const testInput = {
        badgeContent: 'TESTBADGECONTENT'
    }
    const testChildren = [
        'firstTestChild',
        'secondTestChild'
    ]
    const overridePrimaryInput = {
        badgeContent: 'TESTBADGECONTENT',
        primary: false
    }
    it('Should render a Badge with the correct badgeContent and primary by default', function () {
        const testObject = setup(testInput, testChildren)

        expect(testObject.type).to.equal(Badge)
        expect(testObject.props.badgeContent).to.equal('TESTBADGECONTENT')
        expect(testObject.props.primary).to.be.true
        expect(testObject.props.children[0]).to.equal('firstTestChild')
        expect(testObject.props.children[1]).to.equal('secondTestChild')
        expect(testObject.props.children[2]).to.not.exist
    })

    it('Should allow overriding primary', function () {
        const testObject = setup(overridePrimaryInput, testChildren)

        expect(testObject.props.primary).to.be.false
    })
})