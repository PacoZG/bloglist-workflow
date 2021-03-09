var _ = require('lodash')

const dummy = (blogs) => {
  const blog = blogs.likes = 1
  return blog
}

const totalLikes = (blogs) => {
  const likes = blogs.map(blog => blog.likes)
  const reducer = (sum, like) => { return sum + like }
  return blogs.length === 0
    ? 0
    : likes.reduce(reducer, 0)
}

const favoriteBlog = blogs => {
  var mostLiked = blogs.reduce((mostLikes, blog) => {
    return (mostLikes.likes || 0 ) > blog.likes ? mostLikes : blog
  })

  const blog = {
    'title': mostLiked.title,
    'author': mostLiked.author,
    'likes': mostLiked.likes
  }
  return blog
}

const mostBlogs = blogs => {
  var posts = _.countBy(blogs, 'author')
  var maxKey = _.maxBy(_.keys( posts, (key) => posts[key] ))
  var author = { 'author': maxKey, 'blogs': posts[maxKey] }
  return author
}

const mostLikes = blogs => {
  /*var sumOfLikes = _(blogs).groupBy('author').map((objs, key) => ({
    'author': key,
    'likes': _.sumBy(objs, 'likes') }))
    .value()*/
  var posts = _.groupBy(blogs, 'author')
  var sumOfLikes = []
  var totalLikes = 0
  _.keys(posts).forEach(key => {
    posts[key].map(blog => { totalLikes += blog.likes })
    var author = { 'author': key, 'likes': totalLikes }
    sumOfLikes.push(author)
    totalLikes = 0
  })
  var authorWithMoreLikes = sumOfLikes.reduce( (withMoreLikes, author) => {
    return (withMoreLikes.likes || 0) > author.likes ? withMoreLikes : author }, {})
  return authorWithMoreLikes
}
module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }