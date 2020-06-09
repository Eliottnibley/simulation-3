import React, {Component} from 'react'
import './Dashboard.css'
import {connect} from "react-redux"
import Axios from 'axios'

class Dashboard extends Component {
  constructor () {
    super() 
    this.state = {
      search: '',
      userPosts: false,
      posts: []
    }
  }

  componentWillMount() {
    if (!this.props.isLoggedIn){
      this.props.history.push('/')
    }
    
    this.getPosts()
  }

  reset () {
    this.setState({
      search: '',
      userPosts: false,
    })

    Axios.get(`/api/posts/${this.props.user.userId}`)
      .then(res => {
        this.setState({posts: res.data})
      })
      .catch(err => {
        console.log('get didtn work')
      })
  }

  routePost (post){
    const {id} = post
    this.props.history.push(`/post/${id}`)
  }

  getPosts () {
    const {search, userPosts} = this.state
    const {userId} = this.props.user
    
    if (userPosts && search !== '') {
      Axios.get(`/api/posts/${userId}?userPosts=true&search=${search}`)
      .then(res => {
        this.setState({posts: res.data})
      })
      .catch(err => {
        console.log('get posts did not work')
      })
    }
    else if (search !== '') {
      Axios.get(`/api/posts/${userId}?search=${search}`)
      .then(res => {
        this.setState({posts: res.data})
      })
      .catch(err => {
        console.log('get posts didnt work')
      })
    }
    else if (userPosts){
      Axios.get(`/api/posts/${userId}?userPosts=true`)
      .then(res => {
        this.setState({posts: res.data})
      })
      .catch(err => {
        console.log('get posts hasnt worked')
      })
    }
    else {
      Axios.get(`/api/posts/${userId}`)
      .then(res => {
        this.setState({posts: res.data})
      })
      .catch(err => {
        console.log('get didtn work')
      })
    }
  }

  render() {
    const postsDisplay = this.state.posts.map(elem => {
      return (
        <div onClick={() => this.routePost(elem)} className='single-post'>
          <p className='post-title'>{elem.title}</p>
          <div className='profile'>
            <p className='post-username'>{`by ${elem.username}`}</p>
            <div className='profile-picture'>
              <img src={elem.profile_pic}/>
            </div>
          </div>
        </div>
      )
    })
    return (
      <div className='dashboard-container'>
      <div className='search-container'>
        <input value={this.state.search} onChange={(e) => {this.setState({search: e.target.value})}} placeholder='Search by Title'></input>
        <div className='search-button'>
          <img onClick={() => {this.getPosts()}} src='https://github.com/DevMountain/simulation-3/blob/master/assets/search_logo.png?raw=true'></img>
        </div>
        <div onClick={() => this.reset()} className='reset-button'>Reset</div>
        <p className='search-mypost'>My Posts</p>
        <div onClick={() => this.setState({userPosts: !this.state.userPosts})} className={`checkbox-${this.state.userPosts}`}>
        </div>
      </div>
      <div className='dashboard-posts'>
        {postsDisplay}
      </div>
    </div>
    )
  }
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps)(Dashboard)