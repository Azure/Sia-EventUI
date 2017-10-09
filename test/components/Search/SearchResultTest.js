'use strict'
import { expect } from 'chai';
import React from 'react'
import createComponent from '../../helpers/shallowRenderHelper'
import { SearchResult, setLensColor } from '../../../src/components/Search/SearchResult'
import Engagements from '../../../src/components/Engagements'
import { Link } from 'react-router-dom'
import { ListItem } from 'material-ui'
import IconButtonStyled from '../../../src/components/elements/IconButtonStyled'
import Lens from 'material-ui/svg-icons/image/lens'
import { redA400, yellowA400, blueA400, greenA400 } from 'material-ui/styles/colors'

const inputTicketWithInfo = {
    incidentId: 3,
    originId: 1,
    status: 'Mitigated',
    severity: '1',
    title: 'Test Title'
}

const inputTicketEmpty = {
    incidentId: 4,
    originId: 2,
    title: 'Empty Incident Title'
}

const inputIncident = {

}

const setup = (incident, ticket, dispatch) => createComponent(SearchResult, {incident, ticket, dispatch})


describe('Search Result', function test () {
    beforeEach( () => {
        this.outputWithInfo = setup(inputIncident, inputTicketWithInfo)
        this.outputEmpty = setup(inputIncident, inputTicketEmpty)
    })

    it('Should render a ListItem', () => {
        expect(this.outputWithInfo.type).to.equal(ListItem)
        expect(this.outputWithInfo.props.leftIcon.type).to.equal(IconButtonStyled)
        expect(this.outputWithInfo.props.children[0].type).to.equal(Link)
        expect(this.outputWithInfo.props.children[1].type).to.equal(Engagements)

        expect(this.outputEmpty.type).to.equal(ListItem)
        expect(this.outputEmpty.props.leftIcon.type).to.equal(IconButtonStyled)
        expect(this.outputEmpty.props.children[0].type).to.equal(Link)
        expect(this.outputEmpty.props.children[1].type).to.equal(Engagements)
    })
})

describe('setLensColor', function test () {
    it('Should return green when status is Resolved', () => {
        const result = setLensColor('1', 'Resolved')
        expect(result).to.equal(greenA400)
    })

    it('Should return blue when status is Mitigated', () => {
        const result = setLensColor('1', 'Mitigated')
        expect(result).to.equal(blueA400)
    })

    it('Should return red when severity is 1 and status is neither Mitigated nor Resolved', () => {
        const result = setLensColor('1', 'Something Else')
        expect(result).to.equal(redA400)
    })

    it('Should return yellow by default', () => {
        const result = setLensColor('2', 'Active')
        expect(result).to.equal(yellowA400)
    })
})
