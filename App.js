import React from 'react';
import { connect } from 'react-redux';
import { changeUserName, log, changeAdmin } from './actions'


class App extends React.Component{

  state = {
    status : 'logged_in',
  }

  componentDidMount (){
    this.login()
  }
  

  login(){
    console.log('initial app:')
    const { log } = this.props;
    log({
      status: this.state.status,
    })
  }


  logOut = ()=> {
    console.log('after click:')
    const { log } = this.props;
    log({
      status: 'logged_out',
    })
  }


  handleClick = ()=> {
    const { changeUserName } = this.props;
    changeUserName({            // ** changeUserName() 是个函数，把一个 object { username: "Daniel"} 传进去
      username : "Daniel",
    })
  }

  rootAdmin = ()=> {
    const { changeAdmin } = this.props;
    changeAdmin({
      username : "Admin",
    })
  }


  render() {
    const { username, status } = this.props;
    return (
      <>
        <h1>Hi {username} </h1>
        <button onClick={this.handleClick} > Change Username </button>
        <button onClick={this.rootAdmin} > Change to Admin </button>

        {/* JSON.stringify(status)    // Print out the variable name 'true' or 'false' */} 
        <h1> {JSON.stringify(status)} </h1>               
        <button onClick={this.logOut} > log Out </button>

      </>
    )
  }
};


function mapStateToProps(state) {
  return {
    username: state.user.username,
    status: state.user.status,
  }
}



export default connect(mapStateToProps, {changeUserName, log, changeAdmin})(App);
