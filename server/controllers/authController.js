const bcrypt = require('bcrypt')

module.exports = {
  register: async (req, res) => {
    const db = req.app.get('db')
    const {username, password} = req.body
    const roboImg = `https://robohash.org/${username}`
    
    const existingUser = await db.check_user(username)

    if (existingUser[0]){
      return res.status(409).send('User already exists')
    }
    
    const salt = bcrypt.genSaltSync(5)
    const hash = bcrypt.hashSync(password, salt)

    const newUser = await db.register_user([username, hash, roboImg])

    req.session.user = {
      userId: newUser[0].id,
      username: newUser[0].username,
      profilePic: newUser[0].profile_pic
    }


    res.status(200).send(req.session.user)
  },

  login: async (req, res) => {
    const db = req.app.get('db')
    const {username, password} = req.body

    const user = await db.check_user(username)

    if(!user[0]){
      return res.status(404).send('incorrect')
    }
    
    const authenticated = bcrypt.compareSync(password, user[0].password)

    if(!authenticated){
      return res.status(403).send('incorrect')
    }

    req.session.user = {
      userId: user[0].id,
      username: user[0].username,
      profilePic: user[0].profile_pic
    }
    res.status(200).send(req.session.user)
  },

  logout: (req, res) => {
    req.session.destroy()
    res.sendStatus(200)
  },

  getUser: (req, res) => {
    if (req.session.user){
      res.status(200).send(req.session.user)
    }
    else {
      res.sendStatus(404)
    }
  }
}