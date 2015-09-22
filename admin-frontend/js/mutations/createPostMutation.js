import Relay from 'react-relay';

export default class CreatePostMutation extends Relay.Mutation {
  static fragments = {
    viewer: () => Relay.QL`
      fragment on User {
        id,
      }
    `,
  };
  getMutation() {
    return Relay.QL`mutation{createPost}`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on CreatePostPayload {
        viewer { posts },
        newPostEdge
      }
    `;
  }
  getVariables() {
    return {
      title: this.props.title,
      content: this.props.content,
      published_at: this.props.published_at,
    };
  }
  getConfigs() {
    return [{
      type: 'RANGE_ADD',
      parentName: 'viewer',
      parentID: this.props.viewerId,
      connectionName: 'posts',
      edgeName: 'newPostEdge',
      rangeBehaviors: {
        '': 'append'
      },
    }];
  }
}