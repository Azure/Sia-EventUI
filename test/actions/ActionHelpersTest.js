'use strict'
import { expect, assert } from 'chai'

import * as actionHelpers from 'actions/actionHelpers'

describe('ActionHelpers', function () {
  describe('paginationActions', function () {
    let BASE_NAME = 'TEST'

    let result = actionHelpers.paginationActions(BASE_NAME)

    it('should return a pagination object with types as string values', function () {
      expect(result.types.GOTO_PAGE).to.equal('GOTO_TEST_PAGE')
      expect(result.types.NEXT_PAGE).to.equal('NEXT_TEST_PAGE')
      expect(result.types.PREV_PAGE).to.equal('PREV_TEST_PAGE')
      expect(result.types.SORT).to.equal('SORT_TEST')
      expect(result.types.FILTER).to.equal('FILTER_TEST')
    })
  })

  describe('validateActionSet', function () {
    it('Should throw "Need "try" function on actionSet!" when no try or try is not a function', function () {
      assert.throws(
        () => actionHelpers.validateActionSet({}),
        'Need "try" function on actionSet'
      )
      assert.throws(
        () => actionHelpers.validateActionSet({ try: true }),
        'Need "try" function on actionSet'
      )
    })
    it('Should throw "Need "succeed" function on actionSet!" when no succeed or succeed is not a function', function () {
      assert.throws(
        () => actionHelpers.validateActionSet({ try: () => null }),
        'Need "succeed" function on actionSet'
      )
      assert.throws(
        () => actionHelpers.validateActionSet({ try: () => null, succeed: true }),
        'Need "succeed" function on actionSet'
      )
    })
    it('Should throw "Need "fail" function on actionSet!" when no fail or fail is not a function', function () {
      assert.throws(
        () => actionHelpers.validateActionSet({ try: () => null, succeed: () => null }),
        'Need "fail" function on actionSet'
      )
      assert.throws(
        () => actionHelpers.validateActionSet({ try: () => null, succeed: () => null, fail: true }),
        'Need "fail" function on actionSet'
      )
    })
  })

  describe('testableReduxBackedPromise', function () {
    const mockSuccess = {
      json: 'successJson',
      response: 'successResponse'
    }
    const mockFailure = 'failureError'
    const successDummy = Promise.resolve(mockSuccess)
  })
})
