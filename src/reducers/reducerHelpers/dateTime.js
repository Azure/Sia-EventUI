export const dateTimeReducer = (defaultTime, defaultDate, timeAction, dateAction) =>
(state = defaultTime + 'T' + defaultDate, action) => {
  switch(action.type) {
    case timeAction:
      return state.split('T')[0].concat('T', action.time)
    case dateAction:
      return action.date.concat('T', state.split('T')[1])
    default:
      return state
  }
}

export default dateTimeReducer