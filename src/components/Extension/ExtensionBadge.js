import { Component } from 'react'

class ExtensionBadge extends Component {
  render () {
    chrome.browserAction.setBadgeText({ text: this.props.text })
    return null
  }
}

export default ExtensionBadge
