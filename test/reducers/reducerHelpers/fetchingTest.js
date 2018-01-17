'use strict'
import { expect } from 'chai'
import buildFetching from 'reducers/reducerHelpers/fetching'

describe('Fetching Reducer', function () {
  const defaultActionCases = {
    try: 'TRY',
    succeed: 'SUCCEED',
    fail: 'FAIL'
  }
  const emptyState = []
  const existingFetchesState = [1, 3, 5]

  describe('buildFetching() generates a reducer', function () {
    const reducerUnderTest = buildFetching(defaultActionCases)

    describe('when the action type matches try', function () {
      describe("when state contains the action's id", function () {
        it('should not alter state', function () {
          const testAction = {type: 'TRY', id: 5}

          var result = reducerUnderTest(existingFetchesState, testAction)
          expect(result).to.equal(existingFetchesState)
        })
      })

      describe("when state does not contain the action's id", function () {
        const testAction = {type: 'TRY', id: 13}

        it("should add the action's id to state for an empty state", function () {
          var result = reducerUnderTest(emptyState, testAction)
          expect(result).to.include(13)
        })

        it("should add the action's id to state for a state with ids", function () {
          var result = reducerUnderTest(existingFetchesState, testAction)
          expect(result).to.include(13)
        })
      })
    })

    describe('when the action matches fail or succeed', function () {
      describe("when state does not contain the action's id", function () {
        it('does not alter the state', function () {
          const testAction = {type: 'FAIL', id: 13}

          var result = reducerUnderTest(existingFetchesState, testAction)

          expect(result).to.equal(existingFetchesState)
        })
      })
      describe("when state contains the action's id", function () {
        it("removes the action's id from the state", function () {
          const testAction = {type: 'SUCCEED', id: 3}
          var result = reducerUnderTest(existingFetchesState, testAction)
          expect(result).not.to.include(3)
        })
      })
    })

    describe('when the action does not match a listed case', function () {
      it('Should generate a reducer will not change state', function () {
        const reducerUnderTest = buildFetching(defaultActionCases)
        const testAction = {type: 'NO-OP'}

        expect(reducerUnderTest(emptyState, testAction)).to.equal(emptyState)
      })
    })
  })
})
