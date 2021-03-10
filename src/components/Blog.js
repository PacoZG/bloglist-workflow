import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, deleteBlog, commentBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useParams } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

const Blog = () => {
  const id = useParams().id
  const blog = useSelector(state => state.blogs.find(b => b.id === id))
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(true)
  const showTextarea = { display: visible ? 'none' : '' }

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog))
      dispatch(setNotification('Blog has been deleted!', 'success'))
    }
  }

  const handleLike = () => {
    dispatch(likeBlog(blog))
    dispatch(setNotification(`You liked "${blog.title}"`, 'success'))
  }

  const submitComment = () => {
    var text = document.getElementById('textarea').value
    if (text !== '') {
      const commentedBlog = { ...blog, comments: blog.comments.concat(text) }
      setVisible(!visible)
      dispatch(commentBlog(commentedBlog))
    }
  }

  return (
    <div>
      {blog ?
        <TableContainer component={Paper}>
          <Table >
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan="2">
                  <b>{blog.title}{', by '} {blog.author}</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell colSpan="2">
                  {'URL: '}<a href={`${blog.url}`}>{`${blog.url}`}</a>{', for more info'}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>{blog.likes}{' likes'}</TableCell>
                <TableCell>
                  <Button id="like-button" variant="primary" onClick={handleLike}>
                    {'like'} </Button>
                </TableCell>
              </TableRow>
            </TableBody>
            <TableRow>
              <TableCell><b>{`Added by ${blog.author}`}</b></TableCell>
              {blog && blog.user.id === user.id ?
                <TableCell>
                  <Button id="delete-button" variant="primary" onClick={handleDelete}>
                    {'delete'} </Button>
                </TableCell>
                : null}
            </TableRow>
          </Table>
        </TableContainer>
        : null}
      <div>
        {blog ?
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><b>{'Comments'}</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {blog.comments.map((comment, i) =>
                  <TableRow key={i}>
                    <TableCell><li>{comment}</li> </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          : null}
      </div>
      <textarea style={showTextarea} id={'textarea'} className={'textarea'} placeholder="Make a comment" ></textarea>
      {visible ?
        <div>
          <TableContainer component={Paper}>
            <Table >
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Button variant="primary" onClick={() => setVisible(!visible)}>{'Comment'}</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        :
        <div>
          <TableContainer component={Paper}>
            <Table >
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Button variant="primary" type="submit" onClick={() => { submitComment() }}>{'Submit'}</Button>
                  </TableCell>
                  <TableCell>
                    <Button variant="primary" type="submit" onClick={() => setVisible(!visible)}>{'Cancel'}</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      }
    </div>
  )
}

export default Blog
