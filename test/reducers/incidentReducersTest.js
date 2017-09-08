'use strict'
import { expect } from 'chai';
import * as incidentActions from '../../src/actions/incidentActions.js'
import { map, creation } from '../../src/reducers/incidentReducers.js'

const defaultStateIncidents = {
    1: {
        id: 1,
        primaryTicket: {
            originId: 1000
        },
        events: []
    },
    2: {
        id: 2,
        primaryTicket: {
            originId: 2000
        },
        events: []
    },
    3: {
        id: 3,
        primaryTicket: {
            originId: 3000
        },
        events: []
    },
    4: {
        id: 4,
        primaryTicket: {
            originId: 4000
        },
        events: []
    }
}

const newIncident =  {
    id: 5,
    events: []
}

const createdIncident = {
    id: 10,
    events: []
}

const replacingIncident = {
    id: 4,
    primaryTicket: {
        originId: 4001
    },
    events: []
}

const replacementIncidents = {
    6: {
        id: 6,
        primaryTicket: {
            originId: 300
        },
        events: []
    },
    7: {
        id: 7,
        primaryTicket: {
            originId: 400
        },
        events: []
    },
    8: {
        id: 8,
        primaryTicket: {
            originId: 500
        },
        events: []
    },
    9: {
        id: 9,
        primaryTicket: {
            originId: 600
        },
        events: []
    }
}

const creationDefaultState = {
    input: 'default'
}

const creationWithErrorState = {
    input: '',
    error: 'test value'
}

describe('incidentReducer', function test () {
    describe('map',  function mapTest () {
        beforeEach( () => {
            this.newIncidentId = newIncident.id
            this.sampleDefaultIncidentId = 1
            this.sampleNewIncidentsId = 9
            this.createdIncidentId = 10

            this.OnReceiveIncidentFromDefault = map(defaultStateIncidents, incidentActions.getIncidentActionSet(null).succeed(newIncident))
            this.OnReceiveIncidentsFromDefault = map(defaultStateIncidents, incidentActions.getIncidentsActionSet.succeed(Object.values(replacementIncidents)))
            this.OnCreateIncidentSuccessFromDefault = map(defaultStateIncidents, incidentActions.createIncidentActionSet(null, null).succeed(createdIncident))
            this.OnReceiveIncidentFromDefaultWithOverwrite = map(defaultStateIncidents, incidentActions.getIncidentActionSet(null).succeed(replacingIncident))
        })

        it('Should add incident to map on receive incident or create incident', () => {
            expect(this.OnReceiveIncidentFromDefault[this.newIncidentId]).to.exist
            expect(this.OnCreateIncidentSuccessFromDefault[this.createdIncidentId]).to.exist
        })

        it('Should retain existing incidents on receive incident or create incident', () => {
            expect(this.OnReceiveIncidentFromDefault[this.sampleDefaultIncidentId]).to.exist
            expect(this.OnCreateIncidentSuccessFromDefault[this.sampleDefaultIncidentId]).to.exist
            expect(this.OnReceiveIncidentFromDefaultWithOverwrite[this.sampleDefaultIncidentId]).to.exist
        })

        it('Should overwrite incidents with same id on receive incident', () =>  {
            expect(this.OnReceiveIncidentFromDefaultWithOverwrite[replacingIncident.id].primaryTicket.originId)
            .not.to.equal(defaultStateIncidents[replacingIncident.id].primaryTicket.originId)
        })

        it('Should merge existing incidents with received incidents on receive incidents', () => {
            expect(this.OnReceiveIncidentsFromDefault[this.sampleNewIncidentsId]).to.exist
            expect(this.OnReceiveIncidentsFromDefault[this.sampleDefaultIncidentId]).to.exist
        })
    })

    describe('creation', function creationTest () {
        beforeEach( () => {
            this.newInput = 'new input'
            this.failureError = 'testing'

            this.OnUpdateInputFromDefault = creation(creationDefaultState, incidentActions.updateIncidentCreationInput(this.newInput))
            this.OnUpdateInputFromError = creation(creationWithErrorState, incidentActions.updateIncidentCreationInput(this.newInput))
            this.OnTryCreateIncidentFromDefault = creation(creationDefaultState, incidentActions.createIncidentActionSet('', {}).try())
            this.OnTryCreateIncidentFromError = creation(creationWithErrorState, incidentActions.createIncidentActionSet('', {}).try())
            this.OnFailureFromDefault = creation(creationDefaultState, incidentActions.createIncidentActionSet(null, null).fail(this.failureError))
            this.OnFailureFromError = creation(creationWithErrorState, incidentActions.createIncidentActionSet(null, null).fail(this.failureError))
            this.OnSuccessFromDefault = creation(creationDefaultState, incidentActions.createIncidentActionSet(null, null).succeed(createdIncident))
            this.OnSuccessFromError = creation(creationWithErrorState, incidentActions.createIncidentActionSet(null, null).succeed(createdIncident))
        })

        it('Should retain the value of error on update', () => {
            expect(this.OnUpdateInputFromDefault.error).to.equal(creationDefaultState.error)
            expect(this.OnUpdateInputFromError.error).to.equal(creationWithErrorState.error)
        })

        it('Should clear the value of error on try create and success', () =>  {
            expect(this.OnTryCreateIncidentFromDefault.error).to.be.null
            expect(this.OnTryCreateIncidentFromError.error).to.be.null
            expect(this.OnSuccessFromDefault.error).to.be.null
            expect(this.OnSuccessFromError.error).to.be.null
        })

        it('Should update the value of error on failure', () => {
            expect(this.OnFailureFromDefault.error).to.equal(this.failureError)
            expect(this.OnFailureFromError.error).to.equal(this.failureError)
        })

        it('Should update the value of input on update', () => {
            expect(this.OnUpdateInputFromDefault.input).to.equal(this.newInput)
            expect(this.OnUpdateInputFromError.input).to.equal(this.newInput)
        })

        it('Should retain the value of input on try create and failure', () => {
            expect(this.OnTryCreateIncidentFromDefault.input).to.equal(creationDefaultState.input)
            expect(this.OnTryCreateIncidentFromError.input).to.equal(creationWithErrorState.input)  
            expect(this.OnFailureFromDefault.input).to.equal(creationDefaultState.input)
            expect(this.OnFailureFromError.input).to.equal(creationWithErrorState.input)      
        })

        it('Should empty input on success', () => {
            expect(this.OnSuccessFromDefault.input).to.equal('')
            expect(this.OnSuccessFromError.input).to.equal('')
        })
    })
})
