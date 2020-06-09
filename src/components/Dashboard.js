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

  componentDidMount() {
    if (!this.props.isLoggedIn){
      this.props.history.push('/')
    }
    
  }

  reset () {
    this.setState({
      search: '',
      userPosts: false
    })
  }

  getPosts () {
    const {search, userPosts} = this.state
    
    
  }

  render() {
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

      </div>
    </div>
    )
  }
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps)(Dashboard)