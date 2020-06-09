import React, {Component} from 'react'
import {connect} from 'react-redux'
import './Form.css'
import Axios from 'axios'

class Form extends Component {
  constructor () {
    super() 
    this.state = {
      title: '',
      img: '',
      content: ''
    }
  }

  componentDidMount () {
    if(!this.props.isLoggedIn){
      this.props.history.push('/')
    }
  }

  submit () {
    Axios.post(`/api/post/${this.props.user.userId}`, this.state)
    .then(res => {
      this.setState({
        title: '',
        img: '',
        content: ''
      })
      this.props.history.push('/dashboard')
    })
  }

  render() {
    return (
      <div className='form-container'>
        <div className='form-title'>New Post</div>
        <div className='form' onSubmit={() => this.submit()}>
          <label>Title:</label>
          <input className='title-input' value={this.state.title} onChange={(e) => this.setState({title: e.target.value})}></input>
          <div className='input-pic'>
            <img src={this.state.img}/>
          </div>
          <label>Image URL:</label>
          <input className='url-input' value={this.state.img} onChange={(e) => this.setState({img: e.target.value})}></input>
          <label>Content:</label>
          <textarea className='content-input' value={this.state.content} onChange={(e) => this.setState({content: e.target.value})}></textarea>
          <div onClick={() => this.submit()} className='submit-button'>Post</div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = reduxState => reduxState
export default connect(mapStateToProps)(Form)