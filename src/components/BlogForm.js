import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useField } from '../hooks/index'
import { Table, Form, Button } from 'react-bootstrap'

const BlogForm = ({ createBlog }) => {
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const title = useField('title')
  const author = useField('author')
  const url = useField('url')

  const addBlog = async (event) => {
    event.preventDefault()
    createBlog({
      url: url.param.value,
      title: title.param.value,
      author: author.param.value,
    })
    title.reset()
    author.reset()
    url.reset()
  }

  return (
    <div className="container">
      <Form onSubmit={addBlog}>
        <Table striped  >
          <tbody style={hideWhenVisible}>
            <tr >
              <td><Button id="newblog-button" variant="primary" onClick={() => setVisible(!visible)}>{'new blog'}</Button></td>
            </tr>
          </tbody>
          <tbody style={showWhenVisible}>
            <tr>
              <td><Form.Label>{'title:'}</Form.Label></td>
              <td>
                <Form.Control id="title" name="Title" {...title.param} />
              </td>
            </tr>
            <tr>
              <td><Form.Label>{'author:'}</Form.Label></td>
              <td>
                <Form.Control id="author" name="Author" {...author.param} />
              </td>
              <th>
              </th>
            </tr>
            <tr>
              <td><Form.Label>{'url:'}</Form.Label></td>
              <td>
                <Form.Control id="url" name="url" placeholder="http://example.com" pattern="http://.*"
                  {...url.param}
                />
              </td>
            </tr>
            <tr>
              <td><Button id="create-button" variant="primary" type="submit">{'create'}</Button></td>
              <td><Button id="cancel-button" variant="primary" onClick={() => setVisible(!visible)}>{'cancel'}</Button></td>
            </tr>
          </tbody>
        </Table>
      </Form>

    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm
