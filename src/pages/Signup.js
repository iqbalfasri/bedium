import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import fire, { googleProvider } from '../config/fire';

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
      .catch(error => {
        this.setState({
          message: error.message
        })
      })
  }

  handleLoginWithGoogle = e => {
    e.preventDefault();
    fire.auth().signInWithPopup(googleProvider)
      .then(result => {
        const user = result.user;
        console.log(user)
      })
      .catch(error => {
        console.log(error)
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
                <h1>Daftar</h1>
                <p style={{ color: 'red', lineHeight: '1.5' }}>{this.state.message}</p>
                <div className="form-label-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-input"
                    placeholder="Masukan E-mail"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-label-group">
                  <label>Password</label>
                  <input
                    name="password"
                    type="password"
                    className="form-input"
                    placeholder="Masukan Password"
                    onChange={this.handleChange}
                  />
                </div>
                <button onClick={this.handleRegister}>Daftar</button>
                <button id="google" onClick={this.handleLoginWithGoogle}>Masuk dengan Google</button>
                <p>Sudah punya akun? silahkan <Link to="/signin">Masuk</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Signup;