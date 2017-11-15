'use strict'
import { expect } from 'chai'
import React from 'react'
import createComponent from '../../helpers/shallowRenderHelper'
import Events from '../../../src/components/Timeline/Events'
import BootstrapPlaybook from '../../../src/components/Timeline/Playbook/BootstrapPlaybook'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import moment from 'moment'

const setup = () => {
    let eventTypeOne = {
        name: 'One',
        displayTemplate: {
            pattern: 'One is the loneliest number'
        }
    }

    let eventTypeTwo = {
        name: 'Two',
    }

    let eventTypeThree = {
        name: 'Three',
        displayTemplate: {
            pattern: ''
        }
    }

    let eventTypeFour = {
        name: '',
        displayTemplate: {
            pattern: ''
        }
    }

    let eventOne = {
        eventTypeId: 0,
        data: {
            someField: '',
            displayText: 'One, only one'
        }
    }

    let eventTwo = {
        eventTypeId: 1,
        data: {
            someField: '',
            displayText: ''
        }
    }

    let eventThree = {
        eventTypeId: 2,
        data: {
            displayText: 'User display text',
            someField: 'User data here'
        }
    }

    let eventFour = {
        eventTypeId = 3,
        data: {
            displayText: 'User display text',
            someField: 'User data here'
        }
    }
    

    let eventFive = {
        eventTypeId: 10,
        data: {
            displayText: 'User display text',
            someField: 'User data here'
        }
    }

    let eventSix = {
        eventTypeId = 50,
        data: {
            someField: 'User data here'
        }
    }

    let props = 
    {
        eventTypes = [eventTypeOne, eventTypeTwo, eventTypeThree, eventTypeFour],
        events = [eventOne, eventTwo, eventThree, eventFour, eventFive, eventSix]
    }

    return createComponent(Events, props)
}

describe('Events', function test () {
    beforeEach( () => {
        this.output = setup()
    })

    it('Should return an array', () => {
        expect(this.output.props).to.be.an('array')
    })

    it('Should return an array of six Events', () => {
        expect(this.output.props).to.be.an('array').that.includes(6)
        expect(this.output.props.children[0]).to.equal(Event)
    })

    it('Should return events with text from the eventType.displayTemplate.pattern', () => {
        expect(this.output.props.children[0].text).to.equal('One is the loneliest number')
    })

    it('Should return events with text from the eventType.name if no displayTemplate', () => {
        expect(this.output.props.children[1].text).to.equal('Two')
    })

    it('Should return events with text from the eventType.name if no displayTemplate.pattern', () => {
        expect(this.output.props.children[2].text).to.equal('Three')
    })

    it('Should return events with load message if eventType has no name or displayTemplate', () => {
        expect(this.output.props.children[3].text).to.equal('Loading event information...')
    })

    it('Should return events with text from event displayText when no eventType', () => {
        expect(this.output.props.children[4].text).to.equal('User display text')
    })

    it('Should return events with text from stringified event.data', () => {
        expect(this.output.props.children[5].text).to.equal("someField: 'User data here'")
    })
})
