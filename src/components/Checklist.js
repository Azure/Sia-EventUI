import React from 'react'
import { connect } from 'react-redux'

export class Checklist extends React.Component {
  render () {
    return <div id='checklist'>
      <h2>Checklist</h2>
      <ul>
        <li>one</li>
        <li>two</li>
        <li>three</li>
      </ul>
    </div>
  }
}

function mapStateToProps (state, ownProps) {
  return Object.assign({}, ownProps, state)
}

export default connect(mapStateToProps)(Checklist)
