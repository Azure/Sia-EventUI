import { DateTime } from 'luxon'

import { paginationActions, updatePagination, reduxBackedPromise } from 'actions/actionHelpers'
import * as filterService from 'services/filterService'
import * as notificationActions from 'actions/notificationActions'
export const EVENTS = 'EVENTS'
export const REQUEST_EVENT = 'REQUEST_EVENT'
export const RECEIVE_EVENT = 'RECEIVE_EVENT'
export const RECEIVE_EVENT_FAILURE = 'RECEIVE_EVENT_FAILURE'
export const REQUEST_EVENTS = 'REQUEST_EVENTS'
export const RECEIVE_EVENTS = 'RECEIVE_EVENTS'
export const RECEIVE_EVENTS_FAILURE = 'RECEIVE_EVENTS_FAILURE'
export const POST_EVENT_TRY = 'POST_EVENT_TRY'
export const POST_EVENT_SUCCEED = 'POST_EVENT_SUCCEED'
export const POST_EVENT_FAIL = 'POST_EVENT_FAIL'
export const ADD_EVENT = 'ADD_EVENT'
export const CLEAR_EVENTS = 'CLEAR_EVENTS'

export const pagination = paginationActions(EVENTS)

export const linksHeaderName = 'links'

export const clearEvents = () => ({
  type: CLEAR_EVENTS
})

export const fetchEvent = (eventId) => reduxBackedPromise(
  [getEventsEndPoint() + '/' + eventId],
  getEventActionSet(eventId)
)

export const fetchEvents = (filter) => reduxBackedPromise(
  getEventsFetchArgs(filter),
  getEventsActionSet(filter)
)

export const postEvent = (incidentId, eventTypeId = 0, data = {}, occurrenceTime = DateTime.utc()) => reduxBackedPromise(
    postEventFetchArgs(incidentId, eventTypeId, data, occurrenceTime),
    postEventActionSet(incidentId),
    'POST'
)

export const getEventsEndPoint = (incidentId) => (incidentId ? 'incidents/' + incidentId + '/' : '') + 'events'

export const getEventsFetchArgs = (filter) => ([
  getEventsEndPoint(filter ? filter.incidentId : null) + filterService.serializeFiltersForUrl(filter)
])

export const postEventFetchArgs = (incidentId, eventTypeId, data, occurrenceTime) => ([
  getEventsEndPoint({incidentId}),
  {
    eventTypeId,
    occurred: occurrenceTime,
    eventFired: occurrenceTime,
    data
  }
])

export const getEventActionSet = (eventId) => ({
  try: () => ({
    type: REQUEST_EVENT,
    id: eventId
  }),

  succeed: (event) => (dispatch) => {
    dispatch(notificationActions.emitNotification({
      event
    }))

    dispatch({
      type: RECEIVE_EVENT,
      event,
      id: eventId
    })

    dispatch(updatePagination())
  },

  fail: (failureReason) => ({
    type: RECEIVE_EVENT_FAILURE,
    failureReason,
    id: eventId
  })
})

export const getEventsActionSet = (filter) => ({
  try: () => ({
    type: REQUEST_EVENTS,
    incidentId: filter ? filter.incidentId : null,
    filter
  }),

  succeed: (events, response) => (dispatch) => {
    let linksHeader
    for (let header of response.headers) {
      if (header[0] === linksHeaderName) {
        linksHeader = JSON.parse(header[1])
      }
    }

    dispatch({
      type: RECEIVE_EVENTS,
      filter,
      events,
      incidentId: filter ? filter.incidentId : null,
      pagination: linksHeader
    })

    if (linksHeader && linksHeader.NextPageLink) {
      dispatch(reduxBackedPromise(
                [linksHeader.NextPageLink],
                getEventsActionSet(filter)
            ))
    } else {
      dispatch(updatePagination())
    }
  },

  fail: (failureReason) => ({
    type: RECEIVE_EVENTS_FAILURE,
    failureReason,
    incidentId: filter ? filter.incidentId : null,
    filter
  })
})

export const addEvent = (event, incidentId) => ({
  type: ADD_EVENT,
  incidentId,
  event
})

export const postEventActionSet = (incidentId) => ({
  try: () => ({
    type: POST_EVENT_TRY,
    incidentId
  }),

  succeed: (event) => dispatch => {
    dispatch({
      type: POST_EVENT_SUCCEED,
      incidentId,
      event
    })

    dispatch(updatePagination())
  },

  fail: (failureReason) => ({
    type: POST_EVENT_FAIL,
    incidentId,
    failureReason
  })
})
