const listHelper = require('../utils/list_helper')
const blogs = require ('../blogList')

describe('total likes', () => {

  test ('of empty list is zero', () => {
    const result = listHelper.totalLikes(blogs.listWithNoBlogs)
    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(blogs.listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(blogs.blogs)
    expect(result).toBe(36)
  })
})

describe('Looking for', () => {
  const blog = {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    likes: 12
  }
  test('blog with most likes', () => {
    const result = listHelper.favoriteBlog(blogs.blogs)
    expect(result).toEqual(blog)
  })
  test ('author with most blogs', () => {
    const author = {
      author: 'Robert C. Martin',
      blogs: 3
    }
    const result = listHelper.mostBlogs(blogs.blogs)
    expect(result).toEqual(author)
  })

  test ('author with most likes', () => {
    const author = {
      'author': 'Edsger W. Dijkstra',
      'likes': 17
    }
    const result = listHelper.mostLikes(blogs.blogs)
    expect(result).toEqual(author)
  })
})