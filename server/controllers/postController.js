module.exports = {
  getPosts: async (req, res) => {
    const db = req.app.get('db')
    const {search, userPosts} = req.query
    const {userId} = req.params

    if (userPosts && search){
      const posts = await db.posts_by_user_and_search([userId, search])

      return res.status(200).send(posts)
    }
    if (userPosts){
      const posts = await db.posts_by_user([userId])

      return res.status(200).send(posts)
    }
    if (search){
      const posts = await db.posts_by_search(search)

      return res.status(200).send(posts)
    }
    
    const posts = await db.get_all_posts()

    res.status(200).send(posts)

  },

  newPost: async (req, res) => {
    const db = req.app.get('db')
    const {title, img, content} = req.body
    const {userId} = req.params

    await db.new_post([title, img, content, userId])

    res.sendStatus(200)
  },

  getPost: async (req, res) => {
    const db = req.app.get('db')
    const {postId} = req.params

    const post = await db.get_post(postId)

    if (post[0]){
      return res.status(200).send(post[0])
    }
    return res.status(500).send('no post under that id')
  }
}