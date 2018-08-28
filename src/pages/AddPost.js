import React, { Component } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// import renderHTML from 'react-render-html';

import fire from '../config/fire';

export default class AddPost extends Component {
  constructor() {
    super();

    this.state = {
      title: '',
      body: ''
    }
  }

  addPost = e => {
    e.preventDefault();
    const dbref = fire.database().ref().child('bedium');
    dbref.push().set({
      post_title: this.state.title,
      post_content: this.state.body
    })
  }

  render() {
    return (
      <div className="container">
        <div className="row header">
          <div className="">
            <h1 className="recent-title">Tambah Post</h1>
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
    ['link', 'image', 'video'],
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
