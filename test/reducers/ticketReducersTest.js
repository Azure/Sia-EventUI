'use strict'
import { expect } from 'chai';
import * as ticketActions from '../../src/actions/ticketActions.js'
import * as incidentActions from '../../src/actions/incidentActions.js'
import { map, query, systems } from '../../src/reducers/ticketReducers.js'


const emptyTicketList = {}

const populatedTicketList = {
    38502026: {
        originId: 38502026,
        severity: 1,
        title: 'This is test data',
        owningService: 'Security Team',
        imName: 'Bill Gates',
        imAlias: 'billg',
        status: 'Active',
        incidentId: 1
    },
    44444444: {
        originId: 44444444,
        severity: 1,
        title: 'This is test data',
        owningService: 'Security Team',
        imName: 'Bill Gates',
        imAlias: 'billg',
        status: 'Active',
        incidentId: 1
    },
    38805418: {
        originId: 38805418,
        severity: 2,
        title: 'Loss of Express Route Public Peering Connectivity in Europe West',
        owningService: 'Cloudnet',
        imName: 'Steve Ballmer',
        imAlias: 'steveb',
        status: 'Active',
        incidentId: 2
    }
}

const replacementIncidentsList = [
    {
        id: 3,
        primaryTicket: {
            originId: 38808134
        }
    },
    {
        id: 4,
        primaryTicket: {
            originId: 38805880
        }
    }
]

const defaultQueryString = 'default'

describe('Ticket Reducers', function test () {
    describe('maps reducer', function mapsTest () {
        beforeEach( () => {
            this.OnReceiveIncidentsFromEmpty = map(emptyTicketList, incidentActions.getIncidentsActionSet.succeed(replacementIncidentsList))
            this.OnReceiveIncidentsFromPopulated  = map(populatedTicketList, incidentActions.getIncidentsActionSet.succeed(replacementIncidentsList))
            this.OnCreateIncidentFromEmpty = map(emptyTicketList, incidentActions.createIncidentActionSet().succeed(replacementIncidentsList[0]))
            this.OnCreateIncidentFromPopulated = map(populatedTicketList, incidentActions.createIncidentActionSet().succeed(replacementIncidentsList[0]))
            this.OnReceiveIncidentFromEmpty = map(emptyTicketList, incidentActions.getIncidentActionSet().succeed(replacementIncidentsList[0]))
            this.OnReceiveIncidentFromPopulated = map(populatedTicketList, incidentActions.getIncidentActionSet().succeed(replacementIncidentsList[0]))
        })
        
        it('Should replace the list of tickets on receive incidents', () => {
            expect(Object.values(this.OnReceiveIncidentsFromEmpty).length).to.be.greaterThan(0)
            expect(this.OnReceiveIncidentsFromPopulated[Object.values(populatedTicketList)[0]]).not.to.exist

        })

        it('Should add an ticket on create incident', () => {
            expect(Object.values(this.OnCreateIncidentFromEmpty).filter(function (ticket) {return ticket.originId===38808134})[0]).to.exist
            expect(Object.values(this.OnCreateIncidentFromPopulated).filter(function (ticket) {return ticket.originId===38808134})[0]).to.exist
            expect(Object.values(this.OnReceiveIncidentFromEmpty).filter(function (ticket) {return ticket.originId===38808134})[0]).to.exist
            expect(Object.values(this.OnReceiveIncidentFromPopulated).filter(function (ticket) {return ticket.originId===38808134})[0]).to.exist
        })
    })

    describe('query reducer', function queryTest () {
        beforeEach(function ticketQueryReducerInit () {
            this.updatedQuery = 'updatedQuery'
            this.createdIncidentOriginId = '38808134'

            this.OnUpdateFromDefault = query(defaultQueryString, ticketActions.updateTicketQuery(this.updatedQuery))
            this.OnCreateIncidentFromDefault = query(defaultQueryString, incidentActions.createIncidentActionSet().succeed(replacementIncidentsList[0]))
        })

        it('Should return the updated query value', () => {
            expect(this.OnUpdateFromDefault).not.to.equal(defaultQueryString)
            expect(this.OnUpdateFromDefault).to.equal(this.updatedQuery)
            expect(this.OnCreateIncidentFromDefault).not.to.equal(defaultQueryString)
            expect(this.OnCreateIncidentFromDefault).to.equal(this.createdIncidentOriginId)
        })
    })
})