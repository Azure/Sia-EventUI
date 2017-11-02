'use strict'
import { expect } from 'chai'
import * as popupActions from '../../src/actions/popupActions.js'
import popupReducer from '../../src/reducers/popupReducer'

const defaultState = null

const popupExistsState = {
    popupName: 'Test',
    args: {

    }
}

const actions = {
    show: popupActions.showPopup('TestPopup'),
    hide: popupActions.hidePopup()
}

describe('Popup Reducer', function Test () {
    beforeEach(() => {
        this.showNewFromExists = popupReducer(popupExistsState, actions.show)
        this.hideFromExists = popupReducer(popupExistsState, actions.hide)
        this.showNewFromDefault = popupReducer(defaultState, actions.show)
        this.hideFromDefault = popupReducer(defaultState, actions.hide)
    })

    it('should return null when hidden', () => {
        expect(this.hideFromDefault).to.be.null
        expect(this.hideFromExists).to.be.null
    })

    it('should return object with correct popup name when shown', () => {
        expect(this.showNewFromDefault.popupName).to.equal('TestPopup')
        expect(this.showNewFromExists.popupName).to.equal('TestPopup')
    })
})