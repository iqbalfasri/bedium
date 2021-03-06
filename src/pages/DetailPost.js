import React, { Component } from 'react';
import renderHTML from 'react-render-html';
import { Link } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';
import fire from '../config/fire';



export default class DetailPost extends Component {

  constructor(props) {
    super(props);

    this.state = {
      createdAt: null,
      email: '',
      post_content: '',
      post_title: '',
      uid: '',
      showAlert: false,
      loading: true
    }

    this.postId = props.match.params.article;
    this.auhted = localStorage.getItem('authed');
    this.uidLocal = localStorage.getItem('uid');

  }

  componentWillMount() {
    const dbref = fire.database().ref().child(`bedium/${this.postId}`)
    dbref.once('value')
      .then(snap => {
        const { createdAt, email, post_content, post_title, uid } = snap.val();
        this.setState({
          createdAt,
          email,
          post_title,
          post_content,
          uid,
          loading: false
        }, () => {
          console.log(this.state, 'from state')
        })
      })
      .catch(error => console.log(error));
  }

  removePost = e => {
    e.preventDefault();
    this.setState({
      showAlert: true
    })
  }

  confirmRemove = () => {
    const dbref = fire.database().ref().child(`bedium/${this.postId}`)
    dbref.remove()
      .then(() => {
        // alert('Remove Succeeded');
        this.props.history.replace('/');
      })
      .catch(error => {
        console.log(error);
      })
  }

  render() {
    console.log(this.props, 'Console Props')
    if (this.state.loading) {
      return <div className="loading-modal"><h1>loading...</h1></div>;
    }
    return (
      <div className="container">
        <div className="row header">
          <div className="">
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center'
            }}>
              <Link to="/"><i style={{color: '#111'}} class="fas fa-arrow-left fa-3x">&nbsp;&nbsp;</i></Link>
              <h1 className="recent-title">{this.state.post_title}</h1>
            </div>
            <div className="meta-post">
              <p style={{ fontSize: 12, margin: '10px 0' }}>
                <i class="fas fa-clock"></i> {new Date(this.state.createdAt).toDateString()}
                &nbsp;&nbsp;
                <i class="fas fa-user"></i> {this.state.email}
              </p>
            </div>
          </div>
          {/* <HeaderLink isLogged={this.state.authed} /> */}
        </div>
        <div className="detail-post-container">
          {renderHTML(this.state.post_content)}
        </div>
        <hr />
        {
          (this.state.uid === this.uidLocal) ?
            <div style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-end',
              margin: '20px 0'
            }}>
              <Link to={{
                pathname: `/edit/${this.props.location.state.idPost}`,
                state: {
                  idPost: this.props.location.state.idPost,
                  title: this.props.location.state.titlePost,
                  contentPost: this.props.location.state.contentPost
                }
              }}><i style={{ color: '#111' }} class="fas fa-edit fa-2x"></i></Link>
              &nbsp;&nbsp;&nbsp;&nbsp;
            <button
                style={{ border: 'none', outline: 'none', cursor: 'pointer' }}
                onClick={this.removePost}>
                <i class="fas fa-trash fa-2x"></i>
              </button>
            </div> : null
        }
        <SweetAlert
          warning
          showCancle
          confirmBtnText="Ya, saya yakin"
          confirmBtnBsStyle="danger"
          cancelBtnBsStyle="default"
          title="Apa kamu yakin?"
          show={this.state.showAlert}
          onConfirm={this.confirmRemove}
          onCancel={() => this.setState({ showAlert: false })}
        />
      </div>
    )
  }
}