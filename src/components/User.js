import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

const User = () => {
  const paramId = useParams().id
  const user = useSelector(state => state.users.find(u => u.id === paramId))

  return (
    <div>
      {user ?
        <div className={'blog'}>
          <h2>{user.name}</h2>
          <b>{'Added blogs'}</b>
          <ul>
            {user.blogs.map(blog =>
              <li key={blog.id}>
                <Link to={`/blogs/${blog.id}`}>
                  {blog.title}
                </Link>
              </li>
            )}
          </ul>
        </div>
        : null
      }
    </div>
  )
}

export default User