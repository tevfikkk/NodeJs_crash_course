const http = require('http')
const fs = require('fs')
const _ = require('lodash')

// creates a server
const server = http.createServer((request, response) => {
  //lodash
  const num = _.random(0, 20)
  console.log(num)

  const greet = _.once(() => {
    // it runs the function only once
    console.log('hello gay')
  })

  greet()
  greet()

  //set header content type
  response.setHeader('Content-Type', 'text/html') //sets the header
  let path = './views/'
  switch (request.url) {
    case '/':
      path += 'index.html'
      response.statusCode = 200
      break
    case '/about':
      path += 'about.html'
      response.statusCode = 200
      break
    case '/about-me':
      response.statusCode = 301
      response.setHeader('Location', '/about')
      response.end()
      break
    default:
      path += '404.html'
      response.statusCode = 404
      break
  }

  //send an html file
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err)
      response.end()
    } else {
      //response.write(data)
      response.end(data) // it does the same thing with the code just above
    }
  })
})

server.listen(3000, 'localhost', () => {
  console.log('listening for requests on port 3000')
})
