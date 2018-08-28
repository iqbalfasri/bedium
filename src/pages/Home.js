import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import fire from '../config/fire';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      posts: [],

      title: '',
      content: '',
      authed: false,
      loading: true
    }
  }

  componentDidMount() {
    const dbref = fire.database().ref().child('bedium');
    dbref.on('child_added', (snap) => {
      const posts = this.state.posts;
      posts.push({
        post: snap.val(),
        id_post: snap.key
      })

      this.setState({
        posts: posts,
        loading: false
      })
    })

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

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  submit() {
    const dbref = fire.database().ref().child('bedium');
    dbref.push().set({
      post_title: this.state.title,
      post_content: this.state.content
    });
  }

  renderPost() {
    this.state.posts.map((post, index) => {
      return (
        <Link key={index}
          className="card-list"
          to={{
            pathname: `/post/${post.id_post}`,
            state: {
              titlePost: post.post.post_title,
              contentPost: post.post.post_content
            }
          }}>
          <h1>{post.post.post_title}</h1>
        </Link>
      )
    })
  }

  render() {
    return (
      <div>
        <div className="menu-nav">
          <div className="container d-flex justify-content-between">
            <h1 className="recent-title">Bedium</h1>
            <HeaderLink isLogged={this.state.authed} />
          </div>
        </div>
        <div className="container card-container">
        <h2>Recent Posts</h2>
          {
            this.state.loading === true ? <h1>loading...</h1> :
              this.state.posts.map((post, index) => {
                return (
                  <Link key={index}
                    className="card-list"
                    to={{
                      pathname: `/post/${post.id_post}`,
                      state: {
                        titlePost: post.post.post_title,
                        contentPost: post.post.post_content
                      }
                    }}>
                    <h1>{post.post.post_title}</h1>
                  </Link>
                )
              })
          }
        </div>
      </div>
    )
  }
}

const HeaderLink = (props) => {
  if (props.isLogged) {
    return (
      <div>
        <Link className="auth-btn" to="/addpost">Add Post</Link>
        <button style={{ backgroundColor: 'transparent', color: 'red', border: 'none', cursor: 'pointer', outline: 'none' }} onClick={() => fire.auth().signOut()}>Logout</button>
      </div>
    )
  }
  return (
    <div>
      <Link className="auth-btn" to="/signin">Signin</Link>
      <Link className="auth-btn" to="/signup">Signup</Link>
    </div>
  )
}