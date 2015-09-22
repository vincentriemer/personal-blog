import Relay from 'react-relay';

export default class UpdatePostMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation{updatePost}`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on UpdatePostPayload {
        post {
          title,
          content,
          published_at,
        }
      }
    `;
  }
  getVariables() {
    return {
      id: this.props.id,
      title: this.props.title,
      content: this.props.content,
      published_at: this.props.published_at
    };
  }
  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        post: this.props.id,
      }
    }];
  }
  getCollisionKey() {
    return `update_${this.props.id}`;
  }

  static fragments = {
    post: () => Relay.QL`
      fragment on Post {
        id,
        title,
        content,
        published_at
      }
    `,
  };
}