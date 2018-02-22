import { expect } from 'chai'
import React from 'react'
import { shallow } from 'enzyme'
import 'test/helpers/configureEnzyme'
import { Notification } from 'components/Extension/Notification'

/* eslint-disable no-unused-expressions */
describe('Notification component', function () {
  const originalWindow = global.window
  const originalChrome = global.chrome

  after(function () {
    // Since we are messing with global objects we need to reset them back to the original
    // objects to avoid impacting other test suites.
    global.window = originalWindow
    global.chrome = originalChrome
  })

  beforeEach(function () {
    global.window = {}
    global.chrome = {}
  })

  const baseProps = {
    event: { id: 'eventId0' },
    actions: [],
    engagement: {},
    eventType: {},
    ticket: {}
  }

  context('when not emitted yet', function () {
    it('should create a notification', function () {
      let notificationBodyResult
      global.chrome = {
        notifications: {
          create: notificationBody => { notificationBodyResult = notificationBody }
        }
      }
      shallow(<Notification {...baseProps} />)
      expect(notificationBodyResult).to.not.be.undefined
    })

    it('should dispatch notificationEmitted', function () {
      global.chrome = {
        notifications: {
          create: (body, afterCreate) => { afterCreate('notificationId0') }
        }
      }
      let eventIdResult
      let notificationIdResult
      let buttonActionsResult

      const props = {
        ...baseProps,
        notificationEmitted: (eventId, notificationId, buttonActions) => {
          eventIdResult = eventId
          notificationIdResult = notificationId
          buttonActionsResult = buttonActions
        }
      }

      shallow(<Notification {...props} />)
      expect(eventIdResult).to.equal('eventId0')
      expect(notificationIdResult).to.equal('notificationId0')
      expect(buttonActionsResult).to.not.be.undefined
    })

    describe('createButtonActions', function () {
      it('should create two base actions if no playbook actions provided', function () {
        let notificationBodyResult
        global.chrome = {
          notifications: {
            create: (notificationBody, afterCreate) => {
              notificationBodyResult = notificationBody
              afterCreate('notificationId0')
            }
          }
        }
        let buttonActionsResult
        const props = {
          ...baseProps,
          notificationEmitted: (eventId, notificationId, buttonActions) => {
            buttonActionsResult = buttonActions
          }
        }
        shallow(<Notification {...props} />)
        const notificationButtonTitles = notificationBodyResult.buttons.map(b => b.title)
        const buttonActionTitles = buttonActionsResult.map(b => b.title)
        expect(buttonActionsResult).to.have.lengthOf(2)
        expect(notificationBodyResult.buttons).to.have.lengthOf(2)
        expect(notificationButtonTitles).to.deep.equal(buttonActionTitles)
      })

      it('should create at most two buttons based on the playbook actions provided', function () {
        let notificationBodyResult
        global.chrome = {
          notifications: {
            create: (notificationBody, afterCreate) => {
              notificationBodyResult = notificationBody
              afterCreate('notificationId0')
            }
          }
        }
        let buttonActionsResult
        const props = {
          ...baseProps,
          notificationEmitted: (eventId, notificationId, buttonActions) => {
            buttonActionsResult = buttonActions
          },
          actions: [{
            actionTemplate: { name: 'actionTemplate0', isUrl: true },
            name: 'playbookAction0'
          }, {
            actionTemplate: { name: 'actionTemplate1', isUrl: true },
            name: 'playbookAction1'
          }]
        }
        shallow(<Notification {...props} />)
        const notificationButtonTitles = notificationBodyResult.buttons.map(b => b.title)
        const buttonActionTitles = buttonActionsResult.slice(0, 2).map(b => b.title)
        expect(buttonActionsResult).to.have.lengthOf(4)
        expect(notificationBodyResult.buttons).to.have.lengthOf(2)
        expect(notificationButtonTitles).to.deep.equal(buttonActionTitles)
        expect(notificationButtonTitles[0]).to.contain(props.actions[0].name)
      })
    })
  })

  context('when emitted already', function () {
    it('should not create a notification', function () {
      let notificationBodyResult
      global.chrome = {
        notifications: {
          create: notificationBody => { notificationBodyResult = notificationBody }
        }
      }
      const props = {...baseProps, isEmitted: true}
      const shallowNotification = shallow(<Notification {...props} />)
      expect(shallowNotification.length).to.equal(1)
      expect(notificationBodyResult).to.be.undefined
    })
  })

  context('when notification clicked', function () {
    const clickedProps = {
      ...baseProps,
      isEmitted: true,
      isClicked: true,
      buttonActions: [{url: 'url0'}, {url: 'url1', default: true}, {url: 'url2'}]
    }

    it('should open a new tab pointing to the button action url', function () {
      let urlResult
      global.chrome.tabs = { create: tab => { urlResult = tab.url } }
      shallow(<Notification {...{...clickedProps, buttonIndex: 0}} />)
      expect(urlResult).to.equal(clickedProps.buttonActions[0].url)
      shallow(<Notification {...{...clickedProps, buttonIndex: 2}} />)
      expect(urlResult).to.equal(clickedProps.buttonActions[2].url)
    })

    it('should fallback to the default action url when clicked in body instead of button', function () {
      let urlResult
      global.chrome.tabs = { create: tab => { urlResult = tab.url } }
      shallow(<Notification {...clickedProps} />)
      const defaultActionUrl = clickedProps.buttonActions.find(buttonAction => buttonAction.default).url
      expect(urlResult).to.equal(defaultActionUrl)
    })
  })
})
