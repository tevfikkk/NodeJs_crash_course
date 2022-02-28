const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const blogRoutes = require('./routes/blogRoutes')

//express app
const app = express() // invoking function

//connects to mongo db
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
app.use(express.urlencoded({ extended: true })) // accepting a data
app.use(morgan('dev'))

// routes
app.get('/', (req, res) => {
  res.redirect('/blogs')
})

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' })
})

//blog routes
app.use('/blogs', blogRoutes)

//404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' })
})

// app.listen(3000, () => {
//   console.log('Server running')
// })
