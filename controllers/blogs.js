const blogsRouter = require ('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt =  require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.status(201).json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const blog = new Blog ({
    url: body.url,
    title: body.title,
    author: body.author,
    user: user._id,
    likes: body.likes || 0
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog.toJSON())
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog.toJSON())
  } else {
    response.status(404).end()
  }
})

blogsRouter.delete('/:id', async (request, response) => {

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const blog = await Blog.findById(request.params.id)
  const userId = decodedToken.id
  if ( blog.user.toString() === userId.toString() ){
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).json().end()
  }
  else {
    return response.status(401).json({ error: 'Only the creator can delete the blog' })
  }
})

blogsRouter.put('/:id', (request, response) => {
  const body = request.body
  const blog = {
    url: body.url,
    title: body.title,
    author: body.author,
    userId: body.userId,
    likes: body.likes,
    comments: body.comments
  }
  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedBlog => updatedBlog.toJSON())
    .then(savedAndUpdatedBlog => {
      response.status(201).json(savedAndUpdatedBlog)
    })
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const body = request.body
  const blog = {
    url: body.url,
    title: body.title,
    author: body.author,
    userId: body.userId,
    likes: body.likes,
    comments: body.comments
  }
  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedBlog => updatedBlog.toJSON())
    .then(savedAndUpdatedBlog => {
      response.status(201).json(savedAndUpdatedBlog)
    })
})

module.exports = blogsRouter