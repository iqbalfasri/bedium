import React, { Component } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Link } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';
import fire, { TimeStamp } from '../config/fire';

export default class EditPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.location.state.title,
      body: props.location.state.contentPost,
      showAlert: false
    }

    this.postId = props.location.state.idPost;
  }

  componentDidMount() {
    const dbref = fire.database().ref().child(`bedium/${this.postId}`);
    dbref.once('value')
      .then(data => console.log(data.val()))
      .catch(error => console.log(error))
  }

  editPost = e => {
    e.preventDefault();
    // Update
    const dbref = fire.database().ref().child(`bedium/${this.postId}`);
    dbref.update({
      post_title: this.state.title,
      post_content: this.state.body,
      createdAt: TimeStamp
    }, (error) => {
      if (error) {
        console.log('Gagal Edit', error);
        return;
      }
      this.setState({
        showAlert: true
      })
    });
  }

  onConfirm = () => {
    this.setState({
      showAlert: false
    }, () => {
      // Langsung dialihkan ke halaman utama
      window.location.replace('/');
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
              <h1 className="recent-title">Edit Post</h1>
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
                value={this.state.title}
                className="form-input"
                placeholder="Masukan Judul"
                onChange={e => this.setState({
                  title: e.target.value
                })}
              />
            </div>
            <ReactQuill
              modules={EditPost.modules}
              formats={EditPost.formats}
              value={this.state.body}
              placeholder="Body"
              onChange={e => this.setState({
                body: e
              }, () => {
                console.log(this.state.body)
              })}
            />
            <button onClick={this.editPost} className="my-button">Edit post</button>
            <SweetAlert
              success
              title="Berhasil edit post"
              show={this.state.showAlert}
              onConfirm={this.onConfirm}
            />
          </form>
        </div>
      </div>
    )
  }
}

EditPost.modules = {
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

EditPost.formats = [
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