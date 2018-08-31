import React, { Component } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Link } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';

import fire, { TimeStamp } from '../config/fire';

export default class AddPost extends Component {
  constructor() {
    super();

    this.state = {
      title: '',
      body: '',
      showAlert: false
    }
  }

  addPost = e => {
    e.preventDefault();
    const getUserLocal = JSON.parse(localStorage.getItem('user'));
    const dbref = fire.database().ref().child('bedium');
    if (this.state.title === '' && this.state.body === '') {
      return;
    }
    dbref.push().set({
      post_title: this.state.title,
      post_content: this.state.body,
      uid: getUserLocal.uid,
      email: getUserLocal.email,
      createdAt: TimeStamp
    }, (error) => {
      if (error) {
        console.log('Ada error', error);
      } else {
        this.setState({
          showAlert: true
        })
      }
    })
  }

  onConfirm = () => {
    this.setState({
      showAlert: false
    }, () => {
      // Langsung dialihkan ke halaman utama
      this.props.history.replace('/');
    })
  }

  render() {
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
              <h1 className="recent-title">Tambah Post</h1>
            </div>
          </div>
          {/* <HeaderLink isLogged={this.state.authed} /> */}
        </div>
        <div className="card-container">
          <form>
            <div className="form-label-group">
              <label htmlFor="inputJudul">Masukan Judul</label>
              <input
                id="inputJudul"
                className="form-input"
                placeholder="Masukan Judul"
                onChange={e => this.setState({
                  title: e.target.value
                })}
              />
            </div>
            <ReactQuill
              modules={AddPost.modules}
              formats={AddPost.formats}
              value={this.state.body}
              placeholder="Body"
              onChange={e => this.setState({
                body: e
              }, () => {
                console.log(this.state.body)
              })}
            />
            <button onClick={this.addPost} className="my-button">Tambahkan</button>
            <SweetAlert
              success
              title="Berhasil tambah post"
              show={this.state.showAlert}
              onConfirm={this.onConfirm}
            />
          </form>
        </div>
      </div>
    )
  }
}

AddPost.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image'],
    ['clean'],
    ['code-block']
  ]
};

AddPost.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'link',
  'image',
  'video',
  'code-block'
];
