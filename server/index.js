const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const Router = require('./lib/routes/index')

const app = express()

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.text()) // for parsing application/json
app.use(bodyParser.urlencoded({
  extended: true,
})) // for parsing application/x-www-form-urlencoded

const port = 3000
const isDev = app.get('env') !== 'production'

Router(app)

if (isDev) {
  // add "reload" to express, see: https://www.npmjs.com/package/reload
  const server = http.createServer(app);

  server.listen(port, () => {
    console.log(`The server is running at http://localhost:${port}/`)
  })
} else {
  // static assets served by express.static() for production
  app.listen(port, () => {
    console.log(`The server is running at http://localhost:${port}/`)
  })
}
