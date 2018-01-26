import moment from 'moment'
import { paginationActions, updatePagination, reduxBackedPromise } from 'actions/actionHelpers'
import * as filterActions from 'actions/filterActions'

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

export const pagination = paginationActions(EVENTS)

export const linksHeaderName = 'links'

export const fetchEvent = (incidentId, eventId) => reduxBackedPromise(
    [getEventsEndPoint(incidentId) + eventId],
    getEventActionSet(incidentId, eventId)
)

export const fetchEvents = (filter) => reduxBackedPromise(
        getEventsFetchArgs(filter),
        getEventsActionSet(filter.incidentId)
    )

export const postEvent = (incidentId, eventTypeId = 0, data = {}, occurrenceTime = moment()) => reduxBackedPromise(
    postEventFetchArgs(incidentId, eventTypeId, data, occurrenceTime),
    postEventActionSet(incidentId),
    'POST'
)

export const getEventsEndPoint = (incidentId) => (incidentId ? 'incidents/' + incidentId + '/' : '') + 'events/'

export const getEventsFetchArgs = (filter) => ([
  getEventsEndPoint(filter.incidentId) + filterActions.serializeFiltersForUrl(filter)
])

export const getEventFetchArgs = (incidentId, eventId) => {
  return [getEventsEndPoint(incidentId) + eventId]
}

export const postEventFetchArgs = (incidentId, eventTypeId, data, occurrenceTime) => ([
  getEventsEndPoint(incidentId),
  {
    eventTypeId,
    occurred: occurrenceTime,
    eventFired: occurrenceTime,
    data
  }
])

export const getEventActionSet = (incidentId, eventId) => ({
  try: () => ({
    type: REQUEST_EVENT,
    incidentId,
    id: eventId
  }),

  succeed: (event) => (dispatch) => {
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
    incidentId,
    id: eventId
  })
})

export const getEventsActionSet = (incidentId) => ({
  try: () => ({
    type: REQUEST_EVENTS,
    incidentId
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
      events,
      incidentId,
      pagination: linksHeader
    })

    if (linksHeader.NextPageLink) {
      dispatch(reduxBackedPromise(
                [linksHeader.NextPageLink],
                getEventsActionSet(incidentId)
            ))
    } else {
      dispatch(updatePagination())
    }
  },

  fail: (failureReason) => ({
    type: RECEIVE_EVENTS_FAILURE,
    failureReason,
    incidentId
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
