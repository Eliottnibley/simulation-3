import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {loginUser} from '../redux/reducer'
import Axios from 'axios'
import './Auth.css'

class Auth extends Component {
  constructor () {
    super() 
    this.state = {
      username: '',
      password: ''
    }
  }

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  register = () => {
    const {username, password} = this.state

    Axios.post('/appi/auth/register', {username: username, password: password})
    .then(res => {
      this.props.loginUser(res.data)
      this.props.history.push('/dashboard')
    })
    .catch(err => {
      alert('Username already exists')
    })
  }

  login = () => {
    const {username, password} = this.state

    Axios.post('/api/auth/login', {username: username, password: password})
    .then(res => {
      this.props.loginUser(res.data)
      this.props.history.push('/dashboard')
    })
    .catch(err => {
      alert('Username or Password incorrect')
    })
  }

  render() {
    const {username, password} = this.state
    return (
      <div className='auth-container'>
        <img src='https://github.com/DevMountain/simulation-3/blob/master/assets/helo_logo.png?raw=true'></img>
        <h1>Helo</h1>
        <span>Username:
          <input name='username' value={username} onChange={(e) => this.handleChange(e)}></input>
        </span>
        <span>Password:
          <input name='password' value={password} onChange={(e) => this.handleChange(e)}></input>
        </span>
        <span>
          <button onClick={() => {this.login()}}>Login</button>
          <button onClick={() => this.register()}>Register</button>
        </span>
      </div>
    )
  }
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, {loginUser})(Auth)