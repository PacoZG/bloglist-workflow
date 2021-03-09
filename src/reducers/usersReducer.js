import userService from '../services/users'

const usersReducer = (state = [], action) => {
  //console.log('ACTION DATA IN USERSSSREDUCER:', action.data)
  //console.log('STATE OF STATE IN USERSSSREDUCER:',state)
  switch (action.type) {
  case 'INIT_USERS':
    return action.data
  default:
    return state
  }
}

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch({
      type: 'INIT_USERS',
      data: users,
    })
  }
}

export default usersReducer
