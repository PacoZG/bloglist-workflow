import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import localDB from '../utils/localdb'
import { userLogout } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Button } from 'react-bootstrap'

const Menu = () => {
  const user = localDB.loadUser()
  const dispatch = useDispatch()
  const history = useHistory()

  const handleLougout = async () => {
    dispatch(setNotification(`logged out, see next time ${user.name}`, 'error'))
    await dispatch(userLogout())
    history.push('/about')
  }
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      {user ?
        <div>
          <Link style={padding} to="/about">{'Home'}</Link>
          <Link style={padding} to="/blogs">{'Blogs'}</Link>
          <Link style={padding} to="/users">{'Users'}</Link>
          <em><b>{`${user.name} has logged in `}</b>
            <Button id="logout-button" variant="primary" type="submit"
              onClick={handleLougout} >
              {'logout'}
            </Button></em>
        </div>
        :
        <div>
          <Link style={padding} to="/about">{'Home'}</Link>
          <Link style={padding} to="/login">{'login'}</Link>
        </div>
      }
    </div>
  )
}

export default Menu