import { expect } from 'chai'

import createComponent from 'test/helpers/shallowRenderHelper'

import { DisplayAction, DisplayPlaybook } from 'components/Timeline/Playbook/DisplayPlaybook'
import Play from 'components/Timeline/Playbook/Play'

describe('DisplayPlaybook', function () {
  describe('Component - Display Single', function () {
    const testAction = {
      name: 'test'
    }
    it('Should output a div with a Play to render the link', function () {
      const testResult = DisplayAction(testAction, 1, 2, 3, 4, 5)
      expect(testResult.type).to.equal('div')
      expect(testResult.props.children.type).to.equal(Play)
    })
  })

  describe('Component - Display All', function () {
    it('Should output a div with a list of div children with Play children when passed actions', function () {
      const input = {
        ticketId: 1,
        incidentId: 3,
        actions: [
          {
            name: 'testOne'
          },
          {
            name: 'testTwo'
          },
          {
            name: 'testThree'
          }
        ]
      }

      const testResult = createComponent(DisplayPlaybook, input)
      expect(testResult.type).to.equal('div')
      expect(testResult.props.children[0].props.children.props.action).to.equal(input.actions[0])
      expect(testResult.props.children[1].props.children.props.action).to.equal(input.actions[1])
      expect(testResult.props.children[2].props.children.props.action).to.equal(input.actions[2])
    })

    it('Should output an empty div when passed no actions', function () {
      const input = {
        ticketId: 1,
        incidentId: 3
      }

      const testResult = createComponent(DisplayPlaybook, input)

      expect(testResult.type).to.equal('div')
      expect(testResult.props.children).to.be.null
    })
  })
})
