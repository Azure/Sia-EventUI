'use strict'
import { expect } from 'chai'
import { Link } from 'react-router-dom'
import MenuItem from 'material-ui/MenuItem'
import MenuLink from 'components/elements/MenuLink'

describe('MenuLink', function() {
  describe('when all input is valid', function() {
    const mockTitle = 'mock title'
    const mockToolTip = 'mock tool tip'
    const mockRoute = '/mock/route'
    const mockOnClick = () => 'clicked'
    const mockRightIcon = {}

    const result = MenuLink({
      primaryText: mockTitle,
      toolTip: mockToolTip,
      route: mockRoute,
      onClick: mockOnClick,
      rightIcon: mockRightIcon
    })

    it('should render a MenuItem', function() {
      expect(result.type).to.equal(MenuItem)
    })

    it('should not contain a Link in the primaryText', function() {
      expect(result.props.primaryText.type).to.not.equal(Link)
    })

    it('should link to the provided route', function () {
      expect(result.props.containerElement.props.to).to.equal(mockRoute)
    })

    it('should display the provided text as primaryText', function () {
      expect(result.props.primaryText.props.children).to.contain(mockTitle)
    })

    it('should have a key that is composed of both the route and primaryText', function () {
      expect(result.key).to.equal(mockTitle + mockRoute)
    })

    it('should contain the provided rightIcon', function () {
      expect(result.props.rightIcon).to.equal(mockRightIcon)
    })
  })
})
