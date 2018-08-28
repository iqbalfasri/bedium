import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';

import fire from '../config/fire';

class Signup extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      message: ''
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleRegister = e => {
    e.preventDefault();
    fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(user => {

      })
      .catch(error => {
        this.setState({
          message: error.message
        })
      })
  }

  render() {
    // console.log(this.state, 'from state')
    return (
      <div className="auth">
        <div className="d-flex flex-direction-row">
          <div className="col-md-6 col-sm-0 col-xs-0 bg">
          </div>
          <div className="col-md-6 col-sm-12 col-xs-12">
            <div className="container main-wrapper d-flex justify-content-center align-items-center">
              <div className="box-auth">
                <h1>Sign up</h1>
                <p style={{ color: 'red', lineHeight: '1.5' }}>{this.state.message}</p>
                <input name="email" placeholder="Masukan E-mail" type="email" onChange={this.handleChange} />
                <input name="password" placeholder="Masukan Password" type="password" onChange={this.handleChange} />
                <button onClick={this.handleRegister}>Signup</button>
                <p>Don't have account? <Link to="/signin">Signin</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Signup;