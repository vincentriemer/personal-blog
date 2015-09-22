import React from 'react';
import Relay from 'react-relay';
import moment from 'moment';

import Post from './post';
import UpdatePostMutation from '../mutations/updatePostMutation';

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
      published_at: publishedDate
    }
  }
  componentWillReceiveProps(nextProps) {
    var {post} = nextProps;

    var publishedDate;
    if (!!post.published_at) {
      publishedDate = moment(post.published_at);
    } else {
      publishedDate = moment();
    }

    this.setState({
      id: post.id,
      title: post.title,
      content: post.content,
      published: !!post.published_at,
      published_at: publishedDate
    });
  }
  handleSave = () => {
    Relay.Store.update(new UpdatePostMutation({
        id: this.state.id,
        title: this.state.title,
        content: this.state.content,
        published_at: this.state.published ? this.state.published_at.format() : null
    }));
  }
}

UpdatePost.propTypes = {
  post: React.PropTypes.object.isRequired
};

export default Relay.createContainer(UpdatePost, {
  fragments: {
    post: () => Relay.QL`
      fragment on Post {
        id,
        title,
        content,
        published_at,
        ${UpdatePostMutation.getFragment('post')}
      }
    `,
  }
});