import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class Auth extends Component {
  constructor () {
    super() 
    this.state = {
      username: '',
      password: ''
    }
  }

  login = () => {
    this.props.history.push('/dashboard')
  }

  render() {
    return (
      <div className='auth-container'>
        <button onClick={() => this.login()}>button</button>
      </div>
    )
  }
}

export default Auth