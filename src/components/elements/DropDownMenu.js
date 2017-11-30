import React from 'react'

class DropDownMenu extends React.Component {
    constructor(props) {
        super(props)
        this.state = {value: ''}
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({value: event.target.value})
    }

    handleSubmit(event) {
        alert(`You chose ${this.state.value}`)
        event.preventDefault()
    }

    populateOptions() {
        let options = Object.values(this.props)
        if (options.length === 0) options = []
        return options
    }

    render() {
        const options = this.populateOptions()
        return (
            <form>
                <label>
                    Filtering On:
                    <select
                        value={this.state.value}
                        onChange={this.handleChange}>
                        {options.map(o => <option value={o} key={o}>{o}</option>)}
                    </select>
                </label>
            </form>
        )
    }
}

export default DropDownMenu