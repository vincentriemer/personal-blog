import React from 'react';
import Relay from 'react-relay';
import moment from 'moment';

import Post from './post';
import UpdatePostMutation from '../mutations/updatePostMutation';
import DeletePostMutation from '../mutations/deletePostMutation';

class UpdatePost extends Post {
  constructor(props) {
    super(props);

    var {post} = props;

    var publishedDate;
    if (!!post.published_at) {
      publishedDate = moment(post.published_at);
    } else {
      publishedDate = moment();
    }

    this.state = {
      id: post.id,
      title: post.title,
      content: post.content,
      published: !!post.published_at,
      published_at: publishedDate,
      viewerId: post.viewer.id,
    }
  }
  handleSave = () => {
    Relay.Store.update(new UpdatePostMutation({
        id: this.state.id,
        title: this.state.title,
        content: this.state.content,
        published_at: this.state.published ? this.state.published_at.format() : null
    }));
  }
  handleDelete = () => {
    Relay.Store.update(new DeletePostMutation({
      postId: this.state.id,
      viewerId: this.state.viewerId
    }), {
      onSuccess: () => {
        this.context.history.pushState(null, '/');
      }
    });
  }
}

export default Relay.createContainer(UpdatePost, {
  fragments: {
    post: () => Relay.QL`
      fragment on Post {
        id,
        title,
        content,
        published_at,
        viewer {
          id,
        }
      }
    `,
  }
});