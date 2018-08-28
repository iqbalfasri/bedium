import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';

import fire from '../config/fire';

class Signin extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      message: ''
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
      console.log('success!!');
    }).then(u => console.log(u))
      .catch(error => this.setState({ message: error.message }))
  }

  render() {
    // console.log(this.state, 'from state')
    return (
      <div className="auth">
        <div className="d-flex flex-direction-row">
          <div className="col-md-6 col-sm-0 col-xs-0 bg-signin">
          </div>
          <div className="col-md-6 col-sm-12 col-xs-12">
            <div className="container main-wrapper d-flex justify-content-center align-items-center">
              <div className="box-auth">
                <h1>Sign in</h1>
                <p style={{ color: 'red', lineHeight: '1.5' }}>{this.state.message}</p>
                <input name="email" placeholder="Masukan E-mail" type="email" onChange={this.handleChange} />
                <input name="password" placeholder="Masukan Password" type="password" onChange={this.handleChange} />
                <button onClick={this.handleLogin}>Signin</button>
                <p>Don't have account? <Link to="/signup">Signup</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Signin;