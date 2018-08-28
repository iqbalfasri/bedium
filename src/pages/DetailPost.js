import React, { Component } from 'react';
import renderHTML from 'react-render-html';
// import fire from '../config/fire';

export default class DetailPost extends Component {

  render() {
    return (

      <div className="container">
        <div className="row header">
          <div className="">
            <h1 className="recent-title">{this.props.location.state.titlePost}</h1>
          </div>
          {/* <HeaderLink isLogged={this.state.authed} /> */}
        </div>
        <div className="card-container">
          {renderHTML(this.props.location.state.contentPost)}
        </div>
      </div>
    )
  }

}