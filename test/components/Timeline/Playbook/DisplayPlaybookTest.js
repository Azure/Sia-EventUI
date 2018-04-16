import { expect } from 'chai'
import { DisplayAction } from 'components/Timeline/Playbook/DisplayPlaybook'
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
})
