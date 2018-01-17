'use strict'
import { expect } from 'chai'
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
})
