import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import renderHTML from 'react-render-html';
import fire from '../config/fire';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      posts: [],
      photoUrl: '',

      title: '',
      content: '',
      authed: false,
      loading: true
    }
  }

  componentDidMount() {
    const dbref = fire.database().ref().child('bedium').orderByChild('createdAt');
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
      console.log(this.state.posts);
    })

    this.removeListener = fire.auth().onAuthStateChanged((user) => {
      if (user) {
        const { photoURL } = user;
        this.setState({
          authed: true,
          photoUrl: photoURL
        }, e => console.log(this.state.photoURL, 'photo url'))
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

  render() {
    return (
      <div>
        <div className="menu-nav">
          <div className="container d-flex justify-content-between">
            <h1 className="recent-title">Bedium</h1>
            <HeaderLink photoUrl={this.state.photoUrl} isLogged={this.state.authed} />
          </div>
        </div>
        <div className="container card-container">
          {
            this.state.loading === true ? <div className="loading-modal"><h1>loading...</h1></div> :
              this.state.posts.map((post, index) => {
                return (
                  <Link key={index}
                    className="card-list"
                    to={{
                      pathname: `/post/${post.id_post}`,
                      state: {
                        idPost: post.id_post,
                        titlePost: post.post.post_title,
                        contentPost: post.post.post_content,
                        datePost: new Date(post.post.createdAt).toDateString(),
                        author: post.post.email,
                        uid: post.post.uid
                      }
                    }}>
                    <h1>{post.post.post_title}</h1>
                    <p style={{ fontSize: 12, margin: '10px 0' }}><i className="fas fa-clock"></i> {new Date(post.post.createdAt).toDateString()}</p>
                    <p>{renderHTML(post.post.post_content.substring(0, 50) + '...')}</p>
                  </Link>
                )
              })
          }
        </div>
        <footer style={{ textAlign: 'center', margin: '10px 0', fontSize: '12px' }}>
          <p>Built with ReactJS and Firebase | <a target="_blank" href="https://github.com/iqbalfasri/bedium">View source code</a></p>
        </footer>
      </div>
    )
  }
}

const HeaderLink = (props) => {
  if (props.isLogged) {
    const defaultPhoto = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGVeEPG3S4_3BnzcE_f-ahGEuBLVqJx63wHqVYfNJIdvlKsTKz';
    return (
      <div>
        <Link className="auth-btn" to="/addpost">Tambah Post</Link>
        <img src={(props.photoUrl === null) ? defaultPhoto : props.photoUrl} />
        <button style={{ backgroundColor: 'transparent', color: 'red', border: 'none', cursor: 'pointer', outline: 'none' }} onClick={() => fire.auth().signOut()}>Keluar</button>
      </div>
    )
  }
  return (
    <div>
      <Link className="auth-btn" to="/signin">Masuk</Link>
      <Link className="auth-btn" to="/signup">Daftar</Link>
    </div>
  )
}