import React, {Component} from 'react'
import {connect} from 'react-redux'

class Form extends Component {
  constructor () {
    super() 
    this.state = {

    }
  }

  componentDidMount () {
    if(!this.props.isLoggedIn){
      this.props.history.push('/')
    }
  }

  render() {
    return (
      <div className='form-container'>
        this is the form
    </div>
    )
  }
}

const mapStateToProps = reduxState => reduxState
export default connect(mapStateToProps)(Form)