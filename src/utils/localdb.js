const saveUser = (user) => {
  localStorage.setItem('loggedBlogUser', JSON.stringify(user))
}

const loadUser = () => {
  return JSON.parse(localStorage.getItem('loggedBlogUser'))
}

const removeUser = () => {
  localStorage.removeItem('loggedBlogUser')
  localStorage.clear()
}

export default { saveUser, loadUser, removeUser }
