'use strict'
import { expect } from 'chai'
import Event from '../../../src/components/Timeline/Event'
import Events from '../../../src/components/Timeline/Events'

const eventTypeOne = {
    name: 'One',
    displayTemplate: {
        pattern: 'One is the loneliest number'
    }
}

const eventTypeTwo = {
    name: 'Two',
}

const eventTypeThree = {
    name: 'Three',
    displayTemplate: {
        pattern: ''
    }
}

const eventTypeFour = {
    name: '',
    displayTemplate: {
        pattern: ''
    }
}

const eventOne = {
    eventTypeId: 0,
    data: {
        someField: '',
        displayText: 'One, only one'
    }
}

const eventTwo = {
    eventTypeId: 1,
    data: {
        someField: '',
        displayText: ''
    }
}

const eventThree = {
    eventTypeId: 2,
    data: {
        displayText: 'User display text',
        someField: 'User data here'
    }
}

const eventFour = {
    eventTypeId: 3,
    data: {
        displayText: 'User display text',
        someField: 'User data here'
    }
}

const eventFive = {
    eventTypeId: 10,
    data: {
        displayText: 'User display text',
        someField: 'User data here'
    }
}

const eventSix = {
    eventTypeId: 50,
    data: {
        someField: 'User data here'
    }
}


const events = [eventOne, eventTwo, eventThree, eventFour, eventFive, eventSix]
const eventActions = null
const eventTypeActions = null
const ticketId = '2'
const incidentId = null
const eventTypes = [eventTypeOne, eventTypeTwo, eventTypeThree, eventTypeFour]


describe('Events', function test () {
    beforeEach( () => {
        console.log(events[5].data)
        this.output = Events(events, eventActions, eventTypeActions, ticketId, incidentId, eventTypes)
    })

    it('Should return an array of Events', () => {
        expect(this.output).to.be.an('array')
        expect(this.output[0].type).to.equal(Event)
    })
    
    it('Should return the right ticketId', () => {
        expect(this.output[0].props.ticketId).to.equal(ticketId)
    })
    it('Should return events with text from the eventType.displayTemplate.pattern', () => {
        expect(this.output[0].props.text).to.equal('One is the loneliest number')
    })

    it('Should return events with text from the eventType.name if no displayTemplate', () => {
        expect(this.output[1].props.text).to.equal('Two')
    })

    it('Should return events with text from the eventType.name if no displayTemplate.pattern', () => {
        expect(this.output[2].props.text).to.equal('Three')
    })

    it('Should return events with load message if eventType has no name or displayTemplate', () => {
        expect(this.output[3].props.text).to.equal('Loading event information...')
    })

    it('Should return events with text from event displayText when no eventType', () => {
        expect(this.output[4].props.text).to.equal('User display text')
    })

    it('Should return events with text from stringified event.data', () => {
        const x = '{"someField":"User data here"}'
        expect(this.output[5].props.text).to.equal('{"someField":"User data here"}')
    })
})
