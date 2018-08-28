import React, { Component } from 'react';
import fire from './config/fire';
import { Switch, Route, Redirect } from 'react-router-dom';

import Home from './pages/Home';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import NotFound from './pages/NotFound';
import DetailPost from './pages/DetailPost';
import AddPost from './pages/AddPost';

class App extends Component {
  constructor() {
    super();

    this.state = {
      authed: false
    }
  }

  componentDidMount() {
    this.removeListener = fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
        })
      } else {
        this.setState({
          authed: false,
        })
      }
    })
  }

  componentWillUnmount() {
    this.removeListener()
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <PublicRoute authed={this.state.authed} path="/signin" component={Signin} />
          <PublicRoute authed={this.state.authed} path="/signup" component={Signup} />
          <Route path="/post/:article" component={DetailPost} />
          <PrivateRoute authed={this.state.authed} path='/addpost' component={AddPost} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

function PublicRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => authed === false
        ? <Component {...props} />
        : <Redirect to='/' />}
    />
  )
}

function PrivateRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => authed === true
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/signin', state: { from: props.location } }} />}
    />
  )
}

export default App;
