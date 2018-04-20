import React from 'react'
import _ from 'lodash'

require('../styles/Checklist.css')

// Stateless, functional components. It is their responsibility to tranform
// data for display. They should be designed so they will not raise an error,
// and they must be contained by ErrorBoundaries if they might raise.
const className = (item) => item.checked ? 'item checked' : 'item unchecked'

const Title = (ticketId) => <h2>
  Checklist {ticketId ? ` for ${ticketId}` : ''}
  <a
    style={{ margin: '0 0 0 10px' }}
    href='.'
  >
    🔙
  </a>
</h2>

class Checklist extends React.Component {
  constructor (props) {
    super(props)

    // This binding is necessary to make `this` work in the callback
    // See also, the Toggle class https://reactjs.org/docs/handling-events.html
    this.toggleCheck = this.toggleCheck.bind(this)
  }

  /* global localStorage, toggleCheck */
  toggleCheck = (ev) => {
    // A predicate method which returns a boolean.
    //   true indicates that the classList doesn't contain checked,
    //     and ∴ should contain checked after toggle.
    //   false indicates that the classList does contain checked,
    //     and ∴ should not contain checked after toggle.
    const shouldBeChecked = () => {
      return !ev.currentTarget.classList.contains('checked')
    }
    const content = () => ev.currentTarget.textContent
    this.itemToUpdate = {
      text: content(),
      checked: shouldBeChecked()
    }
    ev.preventDefault()
    this.setState((pastState) => {
      let index = _.findIndex(
        pastState.items,
        (item) => item.text === this.itemToUpdate.text
      )

      // TODO: Don't mutate state. test, then refactor to assignment instead of mutation.
      pastState.items[index] = this.itemToUpdate
      localStorage.setItem('checklist', JSON.stringify(pastState))
      return pastState
    })
  }

  render () {
    return <div id='checklist'>
      <Title />
      <ul>
        {
          _.chain(this.state && this.state.items)
            .map((item, index) =>
              <li
                className={className(item)}
                onClick={this.toggleCheck}
                key={index}>{ item.text }
              </li>
            )
            .value()
        }
      </ul>
    </div>
  }

  componentDidMount () {
    let ticketId = this.props.initialProps.match.params.ticketId

    let persistedState

    if (localStorage.getItem('checklist')) {
      persistedState = JSON.parse(localStorage.getItem('checklist'))
    } else {
      persistedState = {}
    }

    this.setState((_nullState, props) => {
      return Object.assign({}, { items: props.items }, persistedState)
    })
  }
}

export default Checklist
