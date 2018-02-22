import { Component } from 'react'
import { connect } from 'react-redux'

import config from 'config'
import { fillTemplate, LoadTextFromEvent } from 'services/playbookService'
import { notificationEmitted } from 'actions/notificationActions'

export class Notification extends Component {
  componentDidMount () {
    if (!this.props.isEmitted) {
      this.createNotification()
    }
  }

  render () {
    if (this.props.isClicked) {
      this.handleClicks()
    }
    return null
  }

  handleClicks () {
    const { buttonActions, buttonIndex } = this.props
    const buttonAction = buttonIndex != null
                       ? buttonActions[buttonIndex]
                       : buttonActions.find(buttonAction => buttonAction.default)
    if (buttonAction) {
      chrome.tabs.create({ url: buttonAction.url })
    }
  }

  createNotification () {
    const { notificationEmitted, event } = this.props
    const buttonActions = this.createButtonActions()
    const notificationBody = this.createNotificationBody(buttonActions)
    chrome.notifications.create(notificationBody, (notificationId) => {
      notificationEmitted(event.id, notificationId, buttonActions)
    })
  }

  createNotificationBody (buttonActions) {
    const { event, ticket, eventType, engagement } = this.props
    const severity = ticket.data ? ticket.data.severity : null
    const title = ticket.data ? ticket.data.title : null
    return {
      type: 'basic',
      iconUrl: `/static/sia-blue-icon-128.png`,
      title: `${ticket.originId} | ${ticket.status} ${severity ? '| Sev ' + severity : ''}`,
      message: LoadTextFromEvent(event, eventType, ticket, engagement),
      contextMessage: title || `SRE Incident Assistant | Event ID: ${event.id}`,
      // Only two buttons allowed in chrome notifications
      buttons: buttonActions.slice(0, 2).map(buttonAction => ({
        title: buttonAction.title,
        iconUrl: '/static/sia-green-icon-128.png'
      }))
    }
  }

  createButtonActions () {
    const { actions, event, ticket, eventType, engagement } = this.props
    const ticketSystem = config.ticketSystems[ticket.ticketSystemId || 1]
    const defaultActions = [{
      title: 'Open in SIA',
      url: `${config.eventUiUrl}tickets/${ticket.originId}`,
      default: true
    }, {
      title: `Open in ${ticketSystem.name}`,
      url: `${ticketSystem.ticketUriPrefix}${ticket.originId}${ticketSystem.ticketUriSuffix}`
    }]
    const playbookActions = actions
      ? actions.filter(action => action.actionTemplate.isUrl)
               .map(action => ({
                 title: `${action.name}: ${action.actionTemplate.name}`,
                 url: fillTemplate(action.actionTemplate, event, ticket, eventType, engagement)
               })) : []
    return playbookActions.concat(defaultActions)
  }
}

const mapDispatchToProps = {
  notificationEmitted
}

export default connect(null, mapDispatchToProps)(Notification)
