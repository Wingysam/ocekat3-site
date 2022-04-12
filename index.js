const express = require('express')
const sleep = require('sleep-promise')

const app = express()

const staticRouter = express.static('static-html')
app.use('/', staticRouter)

const posts = []

app.get('/posts', (req, res) => {
  res.send(posts.slice(0, 3))
})

app.post('/submit', express.json(), async (req, res) => {
  if (typeof req.body.text !== 'string') {
    res.send({ success: false })
    return
  }

  posts.unshift(req.body.text)
  res.send({ success: true })
})

function listenCallback() {
  console.log('server listening!')
}
app.listen(3111, listenCallback)