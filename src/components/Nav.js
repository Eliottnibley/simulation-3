import React from 'react'
import './Nav.css'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Axios from 'axios'
import { logoutUser } from '../redux/reducer'

function Nav (props) {

  const logout = () => {
    Axios.delete('/api/auth/logout')
    .then(res => {
      props.logoutUser()
    })
  }
  return (
    <div className='nav-container'>
      <div className='profile-pic-container'>
        <img src={props.user.profilePic}></img>
      </div>
      <p>{props.user.username}</p>
      <Link to='/dashboard'>
        <img className='home-button' src='https://github.com/DevMountain/simulation-3/blob/master/assets/home_logo.png?raw=true'></img>
      </Link>
      <Link to='/form'>
        <img className='new-button' src='https://github.com/DevMountain/simulation-3/blob/master/assets/new_logo.png?raw=true'></img>
      </Link>
      <img onClick={() => {logout()}} className='logout-button' src='https://github.com/DevMountain/simulation-3/blob/master/assets/shut_down.png?raw=true'></img>
    </div>
  )
}

const mapStateToProps = reduxState => reduxState

export default connect (mapStateToProps, {logoutUser})(Nav)