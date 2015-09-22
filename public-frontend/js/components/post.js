import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';

class Post extends React.Component {
  render() {
    var {post} = this.props;
    return (
      <div>
        <h1>{post.title}</h1>
        <div>
          {post.content}
        </div>
        <div>
          <Link to="/">Home</Link>
        </div>
      </div>
    );
  }
}

export default Relay.createContainer(Post, {
  fragments: {
    post: () => Relay.QL`
      fragment on Post {
        title,
        content,
      }
    `,
  }
});