'use strict'
import { expect } from 'chai'
import React from 'react'
import { Link } from 'react-router-dom'
import MenuItem from 'material-ui/MenuItem'
import ActionDelete from 'material-ui/svg-icons/action/delete'
import { removeTicketFromRecent } from 'actions/ticketActions'
import MenuLink, { deleteMenuItem } from 'components/elements/MenuLink'

describe('MenuLink', function() {
  describe('when all input is valid', function() {
    const mockType = 'ticket'
    const mockId = 0
    const mockOnClick = () => 'clicked'
    const mockDispatch = (input) => input

    const result = MenuLink(mockType, mockId, mockOnClick, mockDispatch)

    it('should render a MenuItem', function() {
      expect(result.type).to.equal(MenuItem)
    })

    it('should contain a Link in the primaryText', function() {
      expect(result.props.primaryText.type).to.equal(Link)
    })

    it('should link to a route composed of type and id', function() {
      expect(result.props.primaryText.props.to).to.equal(`/${mockType}s/${mockId}`)
    })

    it('should have a route named for the type and id', function () {
      const mockLinkText = mockType.charAt(0).toUpperCase() + mockType.slice(1)
      expect(result.props.primaryText.props.children).to.equal(`${mockLinkText} ${mockId}`)
    })

    it('should have a key that is composed of both the type and id', function() {
      expect(result.key).to.equal(`${mockType}-${mockId}`)
    })

    it('should contain a rightIcon of type ActionDelete', function() {
      expect(result.props.rightIcon.type).to.equal(ActionDelete)
    })

    it('should contain a rightIcon that sets off a function', function() {
      expect(typeof(result.props.rightIcon.props.onClick)).to.equal('function')
    })
  })

  describe('when type input is not valid', function() {
    const mockId = 0
    const mockOnClick = () => 'clicked'
    const mockDispatch = (input) => input

    describe('when type is null', function() {
      const mockType = null
      it('should throw an error', function() {
        expect(() => MenuLink(mockType, mockId, mockOnClick, mockDispatch)).to.throw('the type input is invalid')
      })
    })

    describe('when type is undefined', function () {
      const mockType = undefined
      it('should throw an error', function () {
        expect(() => MenuLink(mockType, mockId, mockOnClick, mockDispatch)).to.throw('the type input is invalid')
      })
    })

    describe('when type input is less than 2 characters', function () {
      const mockType = ''
      it('should throw an error', function () {
        expect(() => MenuLink(mockType, mockId, mockOnClick, mockDispatch)).to.throw('the type input is invalid')
      })
    })
  })
})
