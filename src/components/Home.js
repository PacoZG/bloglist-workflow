import React from 'react'

const Home = () => (
  <div className="container">
    <h1>{'Welcome to my very first web routed deployed application'}</h1>
    <h2>{'Blogs application for part 7 from Fullstack 2020 course'}</h2>

    <em>{'This application is a very challenging and time taking task, but at the same time it is very educational.'}
      {' It introduces you to the real world of web application developemt, using router and the handy Redux package'}</em>

    <p>{'For more information about me please visit my '}
      <a href='https://github.com/PacoZG'>
        {'GitHub'}
      </a>
      {'. and  '}
      <a href='https://www.linkedin.com/in/francisco-zavala/'>
        {'LinkedIn'}
      </a>
      {' pages.'}</p>
  </div>
)

export default Home