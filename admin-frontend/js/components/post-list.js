import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';

class App extends React.Component {
  render() {
    var currentNumber = this.props.relay.variables.first;
    var buttonStyle = {};

    if (!this.props.viewer.posts.pageInfo.hasNextPage) {
      buttonStyle.display = 'none';
    }
    return (
        <div>
          <h1>Admin Post List</h1>
          <ul>
            {this.props.viewer.posts.edges.map(edge =>
              <li key={edge.node.id}>
                <Link to={`/post/${edge.node.id}`}>
                  {edge.node.title}
                </Link>
              </li>
            )}
          </ul>
          <button 
            style={buttonStyle} 
            onClick={() => this.props.relay.setVariables({first: currentNumber + 5})}>
              next
          </button>
        </div>
    );
  }
}

export default Relay.createContainer(App, {
  initialVariables: {
    first: 5
  },
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        posts(first: $first) {
          edges {
            node {
              id,
              title,
            }
          },
          pageInfo {
            hasNextPage
          }
        }
      }
    `,
  }
});