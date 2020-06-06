import React, {Component} from 'react'
import {connect} from "react-redux"

class Dashboard extends Component {
  constructor () {
    super() 
    this.state = {

    }
  }

  componentDidMount() {
    if (!this.props.isLoggedIn){
      this.props.history.push('/')
    }
  }

  render() {
    return (
      <div className='dashboard-container'>
      this is the dashboard 
    </div>
    )
  }
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps)(Dashboard)