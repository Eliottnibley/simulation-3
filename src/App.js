import React, { Component } from 'react';
import './App.css';
import routes from './routes'
import Nav from './components/Nav'
import {connect} from 'react-redux'

function App (props) {
  if (props.isLoggedIn){
    return (
      <div className='App'>
        <Nav/>
        <div className='App-container'>
        {routes}
        </div>
      </div>
    )
  }
  else {
    return (
      <div className='App-login'>
        {routes}
      </div>
    )
  }
}

const mapStateToProps = reduxState => reduxState

export default connect (mapStateToProps)(App)
