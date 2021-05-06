import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'


const BlogList = () => {
  const blogs = useSelector((state) => state.blogs).sort((a, b) => b.likes - a.likes)

  return (
    <div className="container">
      <h1>{'Blogs'}</h1>
      <Table striped bordered hover >
        <tbody>
          {blogs.map(blog => (
            <tr key={blog.id} >
              <td  >
                <Link to={`/blogs/${blog.id}`}>
                  {`${blog.title} by ${blog.user.name}`}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default BlogList