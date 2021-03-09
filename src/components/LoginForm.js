import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useField } from '../hooks/index'
import { userLogin } from '../reducers/userReducer'
//components
import { setNotification } from '../reducers/notificationReducer'
// services
import loginService from '../services/login'

const LoginForm = () => {
  const dispatch = useDispatch()
  const  history = useHistory()
  const username = useField('usarname')
  const password = useField('password')

  const credentials = {
    username: username.param.value,
    password: password.param.value,
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      var user = await loginService.login(credentials)
      dispatch(userLogin(user))
      dispatch(setNotification(`logged in, welcome back ${user.name}`, 'success'))
      history.push('/blogs')
    } catch (exception) {
      dispatch(setNotification('wrong username or password', 'error'))
    }
  }

  return (
    <div>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>{'username:'}</Form.Label>
          <Form.Control id="username" name="Username" {...username.param} />
          <Form.Label>{'password:'}</Form.Label>
          <Form.Control id="password" name="Password" type="password" {...password.param} />
        </Form.Group>
        <Button variant="primary" id="login-button" type="submit">
          {'login'}
        </Button>
      </Form>
    </div>
  )
}

export default LoginForm
