import React, {Component} from 'react'
import './Post.css'
import Axios from 'axios'
import {connect} from 'react-redux'

class Post extends Component {
  constructor () {
    super() 
    this.state = {
      post: {}
    }
  }

  componentWillMount () {
    if (!this.props.isLoggedIn){
      this.props.history.push('/')
    }

    const {id} = this.props.match.params
    Axios.get(`/api/post/${id}`)
    .then(res => {
      this.setState({post: res.data})
    })
  }

  render() {
    const {title, img, content, username, profile_pic} = this.state.post
    return (
      <div className='post-container'>
        <div className='post-information'>
          <p className='title'>{title}</p>
          <div className='profile-container'>
            <p className='username'>{`by ${username}`}</p>
            <div className='prof-picture'>
              <img src={profile_pic}/>
            </div>
          </div>
        </div>
        <div className='post-substence'>
          <div className='post-image'>
            <img src={img}/>
          </div>
          <p className='post-content'>{content}</p>
        </div>
      </div>
    )
  }
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps)(Post) 