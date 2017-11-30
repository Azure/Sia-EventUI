'use strict'
import { expect } from 'chai'
import * as reducerHelpers from '../../src/reducers/reducerHelpers'
import { buildFetching } from '../../src/reducers/reducerHelpers';

describe('Reducer Helpers', function () {
    const defaultActionCases = {
        try: 'TRY',
        succeed: 'SUCCEED',
        fail: 'FAIL'
    }
    const emptyState = []
    const existingFetchesState = [1, 3, 5]
    describe('Build Fetching', function () {
        it('Should generate a reducer that returns ' +
        'an empty array when passed an action that' +
        ' does not match any of the passed in cases' +
        ' and an empty state', function(){
            const reducerUnderTest = buildFetching(defaultActionCases)
            const testAction = {type: 'NO-OP'}

            expect(reducerUnderTest(emptyState, testAction).length).to.equal(0)
        })

        it('Should generate a reducer that adds ' +
        'id of action to state when state does not' +
        ' contain that id already and action type ' +
        'matches try case', function () {
            const reducerUnderTest = buildFetching(defaultActionCases)
            const testAction = {type: 'TRY', id: 13}

            expect(reducerUnderTest(emptyState, testAction).includes(13)).to.be.true
            expect(reducerUnderTest(existingFetchesState, testAction).includes(13)).to.be.true
        })

    })
})