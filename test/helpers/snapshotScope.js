import chai from 'chai'
import chaiJestSnapshot from 'chai-jest-snapshot'

chai.use(chaiJestSnapshot)

export const snapshot = (testsCallback) => {
  describe('snapshot', function () {
        before(function () {
            chaiJestSnapshot.resetSnapshotRegistry()
        })

        beforeEach(function () {
            chaiJestSnapshot.configureUsingMochaContext(this)
        })

        testsCallback()
    })
}
