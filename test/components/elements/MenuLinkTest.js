'use strict'
import { expect } from 'chai'
import { Link } from 'react-router-dom'
import MenuItem from 'material-ui/MenuItem'
import ActionDelete from 'material-ui/svg-icons/action/delete'
import MenuLink from 'components/elements/MenuLink'

describe('MenuLink', function() {
  describe('when all input is valid', function() {
    const mockType = 'ticket'
    const mockId = 0
    const mockTitle = 'mock title'
    const mockOnClick = () => 'clicked'
    const mockDispatch = (input) => input

    const result = MenuLink({
      type: mockType,
      id: mockId,
      title: mockTitle,
      onClick: mockOnClick,
      dispatch: mockDispatch
    })

    const resultingMenuItem = result.props.children

    it('should render a MenuItem', function() {
      expect(resultingMenuItem.type).to.equal(MenuItem)
    })

    it('should not contain a Link in the primaryText', function() {
      expect(resultingMenuItem.props.primaryText.type).to.not.equal(Link)
    })

    it('should link to a route composed of type and id', function() {
      expect(resultingMenuItem.props.containerElement.props.to).to.equal(`/${mockType}s/${mockId}`)
    })

    describe('primaryText', function() {
      it('should include the title of the ticket', function () {
        expect(resultingMenuItem.props.primaryText.props.children).to.have.string(mockTitle)
      })

      it('should include the id of the ticket', function () {
        expect(resultingMenuItem.props.primaryText.props.children).to.have.string(mockId)
      })
    })

    it('should have a key that is composed of both the type and id', function() {
      expect(resultingMenuItem.key).to.equal(`${mockType}-${mockId}`)
    })

    it('should contain a rightIcon of type ActionDelete', function() {
      expect(resultingMenuItem.props.rightIcon.type).to.equal(ActionDelete)
    })

    it('should contain a rightIcon that sets off a function', function() {
      expect(typeof(resultingMenuItem.props.rightIcon.props.onClick)).to.equal('function')
    })
  })

  describe('when input is valid and there is no title', function() {
    const mockType = 'ticket'
    const mockId = 0
    const mockTitle = ''
    const mockOnClick = () => 'clicked'
    const mockDispatch = (input) => input

    const result = MenuLink({
      type: mockType,
      id: mockId,
      title: mockTitle,
      onClick: mockOnClick,
      dispatch: mockDispatch
    })

    const resultingMenuItem = result.props.children

    describe('primaryText', function() {
      it('should include the id of the ticket', function () {
        expect(resultingMenuItem.props.primaryText.props.children).to.have.string(mockId)
      })
    })
  })
})
