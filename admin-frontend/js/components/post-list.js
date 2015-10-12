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
    flexGrow: 1,
  },
  listAndPreviewWrapper: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'row',
    height: '100%',
    overflowY: 'hidden',
    alignItems: 'strecth',
  },
  listWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: 400,
    overflowY: 'scroll',
    borderRight: '1px solid #999',
    flexShrink: 0,
  },
  previewWrapper: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'hidden',
  }
};

const listElementStyles = {
  elementWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
    paddingTop: 25,
    paddingBottom: 25,
    paddingLeft: 15,
    paddingRight: 15,
    // borderBottom: '1px solid #ddd'
  },
  title: {
    marginRight: 15,
    color: '#999',
  },
};

@Radium
class PostListElement extends React.Component {

  static propTypes = {
    postId: React.PropTypes.string.isRequired,
    postTitle: React.PropTypes.string.isRequired,
    active: React.PropTypes.bool.isRequired,
    onClick: React.PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      hovered: false,
    };
  }

  handleMouseEnter = () => {
    this.setState({ hovered: true });
  }

  handleMouseLeave = () => {
    this.setState({ hovered: false });
  }

  render() {
    let activeStyle = this.props.active ? { 
      color: '#000',
      cursor: 'default', 
    } : {};
    let hoverStyle = this.state.hovered ? { 
      color: '#000',
      cursor: 'pointer',
    } : {};

    return (
      <div
        onClick={this.props.onClick}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        style={listElementStyles.elementWrapper}>
          <h1 style={[listElementStyles.title, hoverStyle, activeStyle]}>
            {this.props.postTitle}
          </h1>
      </div>
    );
  }
}

@Radium
class App extends React.Component {
  static contextTypes = {
    history: React.PropTypes.object,
  }

  handleElementClick = (id) => {
    return () => {
      this.context.history.replaceState(null, `/posts/${id}`);
    }
  }

  render() {
    var currentNumber = this.props.relay.variables.first;
    var buttonStyle = {};

    if (!this.props.viewer.posts.pageInfo.hasNextPage) {
      buttonStyle.display = 'none';
    }
    return (
        <div style={styles.contentWrapper}>
          <TitleBar title=''>
            <Button 
              disabled={false} 
              label='Create a New Post'
              onClick={() => this.context.history.pushState(null, '/new')}
            />
          </TitleBar>
          <div style={styles.listAndPreviewWrapper}>
            <div style={styles.listWrapper}>
              {this.props.viewer.posts.edges.map(edge => {
                return <PostListElement 
                  key={edge.node.id} 
                  postId={edge.node.id} 
                  postTitle={edge.node.title}
                  active={this.context.history.isActive(`/posts/${edge.node.id}`)}
                  onClick={this.handleElementClick(edge.node.id)}
                />;
              })}
            </div>
            <div style={styles.previewWrapper}>
              {this.props.children}
            </div>
          </div>
        </div>
    );
  }
}

export default Relay.createContainer(App, {
  initialVariables: {
    first: 999
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