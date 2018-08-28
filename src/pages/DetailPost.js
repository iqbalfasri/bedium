import React, { Component } from 'react'
import fire from '../config/fire';

export default class DetailPost extends Component {

  render() {
    return (
      <div>
        {/* <h1>Posts {this.props.match.params.article} id user</h1> */}
        <h1>title = {this.props.location.state.titlePost}</h1>
        <p>title = {this.props.location.state.contentPost}</p>
      </div>
    )
  }

}