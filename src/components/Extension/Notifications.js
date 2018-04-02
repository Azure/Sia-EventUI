import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as incidentActions from 'actions/incidentActions'

import ExtensionBadge from 'components/Extension/ExtensionBadge'
import Notification from 'components/Extension/Notification'

class Notifications extends Component {
  componentDidUpdate () {
    if (!this.props.enabled) {
      return
    }

    this.fetchIncidentsIfNeeded()
  }

  fetchIncidentsIfNeeded () {
    const { notifications, incidents, incidentsFetching, fetchIncident } = this.props
    const incidentIds = [...new Set(notifications.map(n => n.incidentId))]
    incidentIds.forEach(incidentId => {
      const incidentIsLoaded = incidents[incidentId]
      const incidentIsFetching = incidentsFetching.includes(incidentId)
      if (incidentIsLoaded || incidentIsFetching) {
        return
      }
      fetchIncident(incidentId)
    })
  }

  render () {
    const { enabled, notifications, unreadCount, eventTypes, incidents } = this.props

    if (!enabled || unreadCount === 0) {
      return <ExtensionBadge text='' />
    }

    const notificationsToRender = notifications.filter(n => incidents[n.incidentId])
      .map(notification => {
        const eventType = eventTypes[notification.event.eventTypeId]
        const actions = eventType ? eventType.actions : null
        const ticket = incidents[notification.incidentId].primaryTicket

        return <Notification
          key={notification.event.id}
          {...notification}
          actions={actions}
          eventType={eventType}
          ticket={ticket}
          />
      })

    return (
      <div>
        <ExtensionBadge text={unreadCount > 99 ? '99+' : unreadCount.toString()} />
        { notificationsToRender }
      </div>)
  }
}

export const mapStateToProps = (state) => {
  const enabled = state.notifications.options.receivePushNotificationsEnabled

  if (!enabled) {
    return { enabled }
  }

  return {
    enabled,
    notifications: state.notifications.list,
    unreadCount: state.notifications.unreadCount,
    eventTypes: state.eventTypes.records,
    incidents: state.incidents.map,
    incidentsFetching: state.incidents.fetchingByIncidentId
  }
}

const mapDispatchToProps = {
  fetchIncident: incidentActions.fetchIncident
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications)
