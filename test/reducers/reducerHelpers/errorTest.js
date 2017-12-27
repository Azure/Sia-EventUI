'use strict'
import { expect } from 'chai'
import buildError from '../../../src/reducers/reducerHelpers/error'

describe('Fetching', function () {
    const defaultActionCases = {
        try: 'TRY',
        succeed: 'SUCCEED',
        fail: 'FAIL'
    }
    const emptyState = []
    const existingErrorsState = [1, 3, 5]

    describe('buildError() generates a reducer', function () {
      const reducerUnderTest = buildError(defaultActionCases)

      describe('when the action type matches fail', function () {
        describe("when state contains the action's id", function () {
          it('should not alter state', function () {
            const testAction = {type: 'FAIL', id: 5}

            var result = reducerUnderTest(existingErrorsState, testAction)
            expect(result).to.equal(existingErrorsState)
          })
        })

        describe("when state does not contain the action's id", function () {
          const testAction = {type: 'FAIL', id: 13}

          it("should add the action's id to state for an empty state", function () {
              var result = reducerUnderTest(emptyState, testAction)
              expect(result).to.include(13)
          })

          it("should add the action's id to state for a state with ids", function () {
              var result = reducerUnderTest(existingErrorsState, testAction)
              expect(result).to.include(13)
          })
        })
      })

      describe('when the action matches try or succeed', function () {
        describe("when state does not contain the action's id", function () {
          it('does not alter the state', function() {
            const testAction = {type: 'TRY', id: 13}

            var result = reducerUnderTest(existingErrorsState, testAction)

            expect(result).to.equal(existingErrorsState)
          })
        })
        describe("when state contains the action's id", function () {
          it("removes the action's id from the state", function() {
            const testAction = {type: 'SUCCEED', id: 3}
            var result = reducerUnderTest(existingErrorsState, testAction)
            expect(result).not.to.include(3)
          })
        })
      })

      describe('when the action does not match a listed case', function() {
        it('Should generate a reducer will not change state', function(){
            const reducerUnderTest = buildError(defaultActionCases)
            const testAction = {type: 'NO-OP'}

            expect(reducerUnderTest(emptyState, testAction)).to.equal(emptyState)
        })
      })
    })
})
