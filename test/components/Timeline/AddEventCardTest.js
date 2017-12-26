'use strict'
import { expect } from 'chai'
import AddEventCard from '../../../src/components/Timeline/AddEventCard'
import AddEvent from '../../../src/components/Timeline/AddEvent'
import { Card, CardHeader, CardText } from 'material-ui/Card'

describe('AddEventCard', function () {
    it('Should render a card with a header and text with a child AddEvent', function () {
        const testResult = AddEventCard(1)

        expect(testResult.type).to.equal(Card)
        expect(testResult.props.children[0].type).to.equal(CardHeader)
        expect(testResult.props.children[1].type).to.equal(CardText)
        expect(testResult.props.children[1].props.children.type).to.equal(AddEvent)
    })
})
