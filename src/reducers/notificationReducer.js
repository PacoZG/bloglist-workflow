const notificationReducer = (state = [], action) => {
  //console.log('NOTIFICATIONreducer STATE:', state)
  //console.log('NOTIFICATIONreducer ACTION:', action.type)
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return action.data
  case 'CLEAR_NOTIFICATION':
    return []
  default:
    return state
  }
}

let timeoutId

export const setNotification = (message, color) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: {
        message: message,
        color: color,
      },
    })

    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION',
      })
    }, 10000)
  }
}

export const clearNotification = () => ({ type: 'CLEAR_NOTIFICATION' })

export default notificationReducer
