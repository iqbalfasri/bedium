import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import fire from '../config/fire';

class Signin extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: ''
    }
  }

  componentDidMount() {

  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleLogin = e => {
    e.preventDefault();
    const { email, password } = this.state;
    fire.auth().signInWithEmailAndPassword(email, password).then((user) => {
      <Redirect to={{ pathname: '/' }} />
      console.log('success!!');
    }).then(u => console.log(u))
      .catch(error => console.log(error))
  }

  render() {
    // console.log(this.state, 'from state')
    return (
      <div className="signin">
        <div className="box-auth">
          {/* <h1>B</h1> */}
          <input name="email" placeholder="email" onChange={this.handleChange} />
          <input name="password" placeholder="password" onChange={this.handleChange} />
          <button onClick={this.handleLogin}>Signin</button>
          {/* <button onClick={() => fire.auth().signOut()}>Logout</button> */}
        </div>
      </div>
    );
  }
}
export default Signin;