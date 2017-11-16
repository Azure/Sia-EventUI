'use strict'
import { expect } from 'chai'
import Event from '../../../src/components/Timeline/Event'
import Events from '../../../src/components/Timeline/Events'

const eventTypeZero = {
    name: 'Everything is set up',
    displayTemplate: {
        pattern: 'Valid displayTemplate.pattern'
    }
}

const eventTypeOne = {
    name: 'No displayTemplate.pattern',
    displayTemplate: {
    }
}

const eventTypeTwo = {
    name: 'Invalid displayTemplate.pattern',
    displayTemplate: {
        pattern: ''
    }
}

const eventTypeThree = {
    name: 'eventType.name'
}

const eventTypeFour = {
    
}

const eventTypeFive = {
    name: ''
}


const eventZero = {
    eventTypeId: 0,
    data: {
        displayText: 'User displayText',
        someField: ''
    }
}


const eventOne = {
    eventTypeId: 100,
    data: {
        displayText: 'User displayText',
        someField: ''
    }
}

const eventTwo = {
    eventTypeId: 100,
    data: {
        displayText: 'User displayText',
        someField: ''
    }
}

const eventThree = {
    eventTypeId: 1,
    data: {
        displayText: 'User displayText',
        someField: 'User data here'
    }
}

const eventFour = {
    eventTypeId: 2,
    data: {
        displayText: 'User displayText',
        someField: 'User data here'
    }
}

const eventFive = {
    eventTypeId: 3
}

const eventSix = {
    eventTypeId: 3,
    data: {
        someField: 'User data here'
    }
}

const eventSeven = {
    eventTypeId: 3,
    data: {
        displayText: '',
        someField: 'User data here'
    }
}

const eventEight = {
    eventTypeId: 4,
    data: {
        someField: 'User data here'
    }
}

const eventNine = {
    eventTypeId: 5,
    data: {
        displayText: '',
        someField: 'User data here'
    }
}

const eventTen = {
    eventTypeId: 100
}

const events = [eventZero, eventOne, eventTwo, eventThree, eventFour, 
    eventFive, eventSix, eventSeven, eventEight, eventNine, eventTen]
const eventActions = null
const eventTypeActions = null
const ticketId = '2'
const incidentId = null
const eventTypes = [eventTypeZero, eventTypeOne, eventTypeTwo, 
    eventTypeThree, eventTypeFour, eventTypeFive]


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
        expect(this.output[0].props.text).to.equal('Valid displayTemplate.pattern')
    })

    it('Should return events with text from the displayText if no eventType', () => {
        expect(this.output[1].props.text).to.equal('User displayText')
    })
 
    it('Should return events with text from the displayText if no displayTemplate', () => {
        expect(this.output[2].props.text).to.equal('User displayText')
    })

    it('Should return events with text from the displayText if no displayText.pattern', () => {
        expect(this.output[3].props.text).to.equal('User displayText')
    })

    it('Should return events with text from the displayText if invalid displayText.pattern', () => {
        expect(this.output[4].props.text).to.equal('User displayText')
    })

    it('Should return events with text from the eventType.name if no eventType.displayTemplate.pattern and no event.data', () => {
        expect(this.output[5].props.text).to.equal('eventType.name')
    })

    it('Should return events with text from the eventType.name if no eventType.displayTemplate.pattern and no event.data.displayText', () => {
        expect(this.output[6].props.text).to.equal('eventType.name')
    })

    it('Should return events with text from the eventType.name if no eventType.displayTemplate.pattern and invalid event.data.displayText', () => {
        expect(this.output[7].props.text).to.equal('eventType.name')
    })

    it('Should return events with text from stringified event.data if no eventType.displayTemplate, no event.data.displayText, and no eventType.name', () => {
        expect(this.output[8].props.text).to.equal('{"someField":"User data here"}')
    })

    it('Should return events with text from stringified event.data if no eventType.displayTemplate, invalid event.data.displayText, and an invalid eventType.name', () => {
        expect(this.output[9].props.text).to.equal('{"displayText":"","someField":"User data here"}')
    })

    it('Should return events with error message when no eventType and no data', () => {
        expect(this.output[10].props.text).to.equal('This event has no text')
    })

})
