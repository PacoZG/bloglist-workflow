describe('Blog app', function () {

  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Paco Zavala',
      username: 'MrPaco',
      password: 'fly23'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000/login')
  })

  it('front page can be opened', function () {
    cy.contains('login')
  })

  it('Login form is shown', function () {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('login')
      cy.get('#username').type('MrPaco')
      cy.get('#password').type('fly23')
      cy.get('#login-button').click()

      cy.contains('Paco Zavala has logged in')
    })
    it('succeeds with wrong credentials', function () {
      cy.contains('login')
      cy.get('#username').type('MrPaco')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.contains('wrong username or password')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'MrPaco', password: 'fly23' })
      cy.get('[href="/blogs"]').click()
      cy.get('#newblog-button').click()
      cy.get('#title').type('I believe I can fly')
      cy.get('#author').type('Michael Jordan')
      cy.get('#url').type('http://www.cbb.com')
      cy.get('#create-button').click()
    })

    it('A blog can be created', function () {
      cy.get('td > a').click()
      cy.contains('I believe I can fly, by Michael Jordan')
    })

    it('a user can like and comment a blog', function () {
      cy.get('td > a').click()
      cy.get('#like-button').click()
      cy.get(':nth-child(4) > .MuiPaper-root > .MuiTable-root > .MuiTableBody-root > .MuiTableRow-root > .MuiTableCell-root > .btn').click()
      cy.get('#textarea').type('You better believe it or will die')
      cy.get(':nth-child(1) > .btn').click()
      cy.contains('You better believe it or will die')
    })

    it('only creator of the blog can deleted', function () {
      cy.get('#logout-button').click()
      const secondUser = {
        name: 'Micheal Jordan',
        username: 'AirJordan',
        password: 'fly23'
      }
      cy.request('POST', 'http://localhost:3001/api/users/', secondUser)
      cy.visit('http://localhost:3000/login')
      cy.get('#username').type('AirJordan')
      cy.get('#password').type('fly23')
      cy.get('#login-button').click()
      cy.get('[href="/blogs"]').click()
      cy.get('td > a').click()
      cy.get('#like-button').click()
    })
  })

  describe('Check order of likes', () => {
    beforeEach('First we post many blogs', () => {
      cy.login({ username: 'MrPaco', password: 'fly23' })
    })

    it('check likes are in order', function () {

      cy.createBlog({ title: 'Blog 1 ', author: 'Paco Zavala', url: 'http://www.one.com' })
      cy.createBlog({ title: 'Blog 2 ', author: 'Paco Zavala', url: 'http://www.two.com' })
      cy.createBlog({ title: 'Blog 3 ', author: 'Paco Zavala', url: 'http://www.three.com' })


      cy.get('[href="/blogs"]').click()
      cy.contains('Blog 1').parent().parent().as('blog1')
      cy.contains('Blog 2').parent().parent().as('blog2')
      cy.contains('Blog 3').parent().parent().as('blog3')


      cy.get(':nth-child(1) > td > a').click()
      cy.get('#like-button').click().click().click().click().click()

      cy.get('[href="/blogs"]').click()
      cy.get(':nth-child(2) > td > a').click()
      cy.get('#like-button').click().click()

      cy.get('[href="/blogs"]').click()
      cy.get(':nth-child(3) > td > a').click()
      cy.get('#like-button').click().click().click().click()

      cy.get('[href="/blogs"]').click()
      cy.get(':nth-child(1) > td > a').click()
      cy.contains('5 likes')

      cy.get('[href="/blogs"]').click()
      cy.get(':nth-child(2) > td > a').click()
      cy.contains('4 likes')

      cy.get('[href="/blogs"]').click()
      cy.get(':nth-child(3) > td > a').click()
      cy.contains('2 likes')

      cy.get('[href="/blogs"]').click()
    })
  })
})

