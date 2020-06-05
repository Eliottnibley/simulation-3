require('dotenv').config()
const express = require('express')
const session = require('express-session')
const massive = require('massive')
const authCtrl = require('./controllers/authController')
const postCtrl = require('./controllers/postController')

const {SESSION_SECRET, SERVER_PORT, CONNECTION_STRING} = process.env

const app = express() 

app.use(express.json())

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 14},
    secret: SESSION_SECRET
  })
)

app.post('/api/auth/register', authCtrl.register)
app.post('/api/auth/login', authCtrl.login)
app.get('/api/posts/:userId', postCtrl.getPosts)
app.post('/api/post/:userId', postCtrl.newPost)
app.get('/api/post/:postId', postCtrl.getPost)

massive({
  connectionString: CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false
  }
})
.then(db => {
  app.set('db', db)
  console.log('Connected to db')
  app.listen(SERVER_PORT, () => console.log(`Server running on port ${SERVER_PORT}`))
})