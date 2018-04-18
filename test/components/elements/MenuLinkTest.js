'use strict'
import React from 'react'
import { expect } from 'chai'
import MenuLink from 'components/elements/MenuLink'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
require('test/helpers/enableSnapshot')

describe('MenuLink', function () {
  describe('when all input is valid', function () {
    const mockTitle = 'mock title'
    const mockToolTip = 'mock tool tip'
    const mockRoute = '/mock/route'
    const mockOnClick = () => 'clicked'
    const mockRightIcon = {}

    it('should match the snapshot', function () {
      const wrapper = shallow(
        <MenuLink
          primaryText={mockTitle}
          toolTip={mockToolTip}
          route={mockRoute}
          onClick={mockOnClick}
          rightIcon={mockRightIcon}
        />
      )

      expect(toJson(wrapper)).to.matchSnapshot()
    })
  })
})
