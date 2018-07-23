const router = (app) => {
  app.get('/', (req, res, next) => {
    res.send('hello world')
  })
}

module.exports = router
