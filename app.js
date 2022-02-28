const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const Blog = require('./models/blog')

//express app
const app = express() // invoking function

// connects to mongo db
const dbURI =
  'mongodb+srv://tevfikkurt1:tevfikkurt1@blogdata.gf4xr.mongodb.net/node-tuts?retryWrites=true&w=majority'
mongoose
  .connect(dbURI)
  .then(result => {
    app.listen(3000)
    console.log('connected to db')
  })
  .catch(err => console.log(err))

//register view engine
app.set('view engine', 'ejs')

//listen for requests

// middleware & static files
app.use(express.static('public'))
app.use(morgan('dev'))

// routes
app.get('/', (req, res) => {
  // const blogs = [
  //   {
  //     title: 'Yoshi finds eggs',
  //     snippet: 'Lorem ipsum dolor sit amet consectetur',
  //   },
  //   {
  //     title: 'Mario finds stars',
  //     snippet: 'Lorem ipsum dolor sit amet consectetur',
  //   },
  //   {
  //     title: 'How to defeat bowser',
  //     snippet: 'Lorem ipsum dolor sit amet consectetur',
  //   },
  // ]

  res.redirect('/blogs')
})

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' })
})

//blog routes
app.get('/blogs', (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 }) //descending order
    .then(result => {
      res.render('index', { title: 'All blogs', blogs: result })
    })
    .catch(err => {
      console.log(err)
    })
})

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new Blog' })
})

//404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' })
})
