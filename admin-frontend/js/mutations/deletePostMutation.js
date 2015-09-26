import Relay from 'react-relay';

export default class DeletePostMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation{ deletePost }`;
  }

  getFatQuery() {
    return Relay.QL`
      fragment on DeletePostPayload {
        viewer { posts },
        deletedPostId
      }
    `;
  }

  getVariables() {
    return {
      postId: this.props.postId
    }
  }

  getCollisionKey() {
    return `delete_${this.props.postId}`;
  }

  getConfigs() {
    return [{
      type: 'NODE_DELETE',
      parentName: 'viewer',
      parentID: this.props.viewerId,
      connectionName: 'posts',
      deletedIDFieldName: 'deletedPostId',
    }];
  }
}