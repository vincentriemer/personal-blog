import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';
import Radium from 'radium';

import TitleBar from './shared/title-bar';
import Button from './shared/button';

var styles = {
  contentWrapper: {
    display: 'flex',
    flexDirection: 'column',
  }
};

@Radium
class App extends React.Component {
  static contextTypes = {
    history: React.PropTypes.object,
  }

  render() {
    var currentNumber = this.props.relay.variables.first;
    var buttonStyle = {};

    if (!this.props.viewer.posts.pageInfo.hasNextPage) {
      buttonStyle.display = 'none';
    }
    return (
        <div style={styles.contentWrapper}>
          <TitleBar title='Post List'>
            <Button 
              disabled={false} 
              label='Create a New Post'
              onClick={() => this.context.history.pushState(null, '/new')}
            />
          </TitleBar>
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