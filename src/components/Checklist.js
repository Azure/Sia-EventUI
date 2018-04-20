import React from 'react'
import _ from 'lodash'

// Stateless, functional components. It is their responsibility to tranform
// data for display. They should be designed so they will not raise an error,
// and they must be contained by ErrorBoundaries if they might raise.
const Header = ({title}) => <h2>{title}</h2>
const className = (item) => item.checked ? 'item checked' : 'item unchecked'

const Title = (ticketId) => <span>
  Checklist {ticketId ? ` for ${ticketId}` : ''}
  <a
    style={{ margin: '0 0 0 10px' }}
    href='.'
  >
    🔙
  </a>
</span>

class Checklist extends React.Component {
  constructor (props) {
    super(props)

    // This binding is necessary to make `this` work in the callback
    this.toggleCheck = this.toggleCheck.bind(this)
  }

  /* global localStorage, toggleCheck */
  toggleCheck = (ev) => {
    const isChecked = () => ev.currentTarget.classList.contains('checked')
    const content = () => ev.currentTarget.textContent
    this.itemToUpdate = { text: content(), checked: !isChecked() }
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
      <Header title={Title()} />
      <ul>
        {
          _.chain(this.state && this.state.items)
            .map((item, index) =>
              <li
                style={{listStyle: 'none'}}
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
