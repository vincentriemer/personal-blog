import 'react-date-picker/base.css';
import 'react-date-picker/theme/hackerone.css';

import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';
import DatePicker from 'react-date-picker';
import moment from 'moment';

import CreatePostMutation from '../mutations/createPostMutation';

export default class Post extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      title: '',
      content: '',
      published: false,
      published_at: moment()
    }
  }

  updateTitle = (evt) => {
    this.setState({ title: evt.target.value });
  }

  updateBody = (evt) => {
    this.setState({ content: evt.target.value});
  }

  updatePublished = (evt) => {
    var value = evt.target.checked;
    this.setState({ published: value});
  }

  updatePublishedDate = (dateString, _) => {
    this.setState({
      published_at: moment(dateString)
    });
  }

  render() {
    var publishDateComponent;

    if (this.state.published) {
      publishDateComponent = (
        <div style={{width: 300}}>
          <h4>Published Date</h4>
          <DatePicker
            date={this.state.published_at}
            onChange={this.updatePublishedDate}
          />
        </div>
      );
    }

    return (
      <div>
        <h4>Title: 
          <input onChange={this.updateTitle} style={{width: '66%', marginLeft: 15}} value={this.state.title}/>
        </h4>
        <h4>Body:</h4>
        <textarea onChange={this.updateBody} style={{width: '66%', height: 300}} value={this.state.content}/>
        <h4>Published:
          <input onChange={this.updatePublished} type='checkbox' checked={this.state.published}/>
        </h4>
        {publishDateComponent}
        <button onClick={this.handleSave} style={{marginTop: 30, fontSize: '13px'}}>Save</button>
        <div style={{marginTop: 30}}>
          <Link to="/">Back</Link>
        </div>
      </div>
    );
  }
}

Post.contextTypes = {
  history: React.PropTypes.object
}