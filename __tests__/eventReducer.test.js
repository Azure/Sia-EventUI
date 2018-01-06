// import reducer from '../src/reducers/eventReducer'
// import { getEventActionSet, getEventsActionSet } from '../src/actions/eventActions'

// const initialState = { "pages": [], "filter": {}, "error": {}, "fetching": []}
// const pages = {"pages": [], "filter": {}} 
// const filter = {"filter": {}}

// describe('eventReducer', () => {
//     const eventId = 42
//     const eventMock = {
//         event: { id: 42 },
//         events: [{ id: 42 }, { id: 43 }]
//     }

//     it('should return the initial state', () => {
//         expect(reducer(undefined, {})).toEqual(initialState)
//     })

//     describe('getEventActionSet', () => {
//         it('should handle REQUEST_EVENT', () => {
//             const tryGetEventAction = () => ({
//                 type: getEventActionSet(eventId).try,
//                 id: eventId
//             })

//             expect(reducer(initialState, tryGetEventAction)).toEqual(initialState)
//         })

//         it('should handle RECEIVE_EVENT_SUCCESS', () => {
//             const succeedGetEventAction = {
//                 type: getEventActionSet(eventId).succeed().type,
//                 event: eventMock.event
//             }

//             const laterState = {"events": [{ id: 0 }]}

//             expect(reducer(initialState, succeedGetEventAction)).toEqual({"events": [{ id: 42 } ] })
//             expect(reducer(laterState, succeedGetEventAction)).toEqual({"events": [{ id: 0 }, { id: 42 }]})
//         })

//         it('should handle RECEIVE_EVENT_FAILURE', () => {
//             const failGetEventAction = {
//                 type: getEventActionSet(eventId).fail.type,
//                 failureReason: 'FAIL'
//             }

//             expect(reducer(initialState, failGetEventAction)).toEqual({"events": [] })
//         })
//     })

//     describe('getEventTypeActionSet', () => {
//         it('should handle REQUEST_EVENTS', () => {
//             const tryGetEventAction = () => ({
//                 type: getEventActionSet.try.type,
//                 id: eventId
//             })

//             expect(reducer(initialState, tryGetEventAction)).toEqual(initialState)
//         })

//         it('should handle RECEIVE_EVENTS_SUCCESS', () => {
//             const succeedGetEventAction = {
//                 type: getEventActionSet.succeed.type,
//                 event: eventMock.event
//             }

//             expect(reducer(initialState, succeedGetEventAction)).toEqual({
//                "events":
//                     [{ id: 42 }, { id: 43}]
//             })
//         })

//         it('should handle RECEIVE_EVENTS_FAILURE', () => {
//             const failGetEventAction = {
//                 type: getEventActionSet.fail,
//                 failureReason: 'FAIL'
//             }

//             const laterState = {"events": { 0: { id: 0 } } }

//             expect(reducer(initialState, failGetEventAction)).toEqual({"events": {} })
//             expect(reducer(laterState, failGetEventAction)).toEqual({"events": [{ id: 0 } ]})
//         })
//     })
// })