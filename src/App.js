import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './index.css'
// components
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import Menu from './components/Menu'
import UserList from './components/UserList'
import User from './components/User'
import Home from './components/Home'
import Blog from './components/Blog'
//reducers
import { initializeUsers } from './reducers/usersReducer'
import { initializeBlogs, createBlog } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])
  const user = useSelector((state) => state.user)

  const addBlog = (blogObject) => {
    dispatch(createBlog(blogObject))
    dispatch(
      setNotification(`a new blog posted: ${blogObject.title} by ${blogObject.author}`, 'success')
    )
  }


  return (
    <div className={'container'}>
      {user ?
        <Router>
          <Notification />
          <Menu />
          <Switch>
            <Route path="/blogs/:id">
              <Blog />
            </Route>
            <Route path="/users/:id">
              <User />
            </Route>
            <Route path="/blogs">
              <BlogForm createBlog={addBlog} />
              <BlogList />
            </Route>
            <Route path="/users">
              <UserList />
            </Route>
            <Route path='/'>
              <Home />
            </Route>
          </Switch>
        </Router>
        :
        <Router>
          <Notification />
          <Menu />
          <Switch>
            <Route path='/about'>
              <Home />
            </Route>
            <Route path='/login'>
              <LoginForm />
            </Route>
            <Route path='/'>
              <Home />
            </Route>
          </Switch>
        </Router>
      }
    </div>
  )
}

export default App
