import React from 'react';
import Relay from 'react-relay';
import moment from 'moment';

import Post from './post';
import CreatePostMutation from '../mutations/createPostMutation';

export default class CreatePost extends Post {
  handleSave = () => {
    let viewerId = this.props.viewer.id;
    Relay.Store.update(new CreatePostMutation({
      viewerId: viewerId,
      title: this.state.title,
      content: this.state.content,
      published_at: this.state.published ? this.state.published_at.format() : null,
    }), {
      onSuccess: (res) => {
        var { createPost: { newPostEdge: { node: { id } } } } = res;
        this.context.history.pushState(null, `/post/${id}`);
      }
    });
  }
}

export default Relay.createContainer(CreatePost, {
  fragments: {
    viewer: () => Relay.QL`
    fragment on User { 
      id,
    }`
  }
});