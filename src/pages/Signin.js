import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import fire, { googleProvider } from '../config/fire';

class Signin extends Component {
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

  handleLogin = e => {
    e.preventDefault();
    const { email, password } = this.state;
    fire.auth().signInWithEmailAndPassword(email, password)
      .catch(error => {
        const { message } = error;
        this.setState({ message })
      });
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
          <div className="col-md-6 col-sm-0 col-xs-0 bg-signin">
          </div>
          <div className="col-md-6 col-sm-12 col-xs-12">
            <div className="container main-wrapper d-flex justify-content-center align-items-center">
              <form onSubmit={this.handleLogin} className="box-auth">
                <h1>Masuk</h1>
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
                <button onClick={this.handleLogin}>Masuk</button>
                <button id="google" onClick={this.handleLoginWithGoogle}>Masuk dengan Google</button>
                <p>Belum punya akun? <Link to="/signup">Daftar</Link></p>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Signin;