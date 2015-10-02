import React from 'react';
import Relay from 'react-relay';
import Radium from 'radium';

import TitleBar from './shared/title-bar';
import Button from './shared/button';

const styles = {
  wrapper: {
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
  }
};

@Radium
class PostListPreivew extends React.Component {
  static contextTypes = {
    history: React.PropTypes.object,
  }

  handleMouseClick = () => {
    this.context.history.pushState(null, `/edit/${this.props.post.id}`);
  }

  render() {
    let {post} = this.props;
    return (
      <div style={styles.wrapper}>
        <TitleBar title={post.title}>
          <Button label='Edit' onClick={this.handleMouseClick} />
        </TitleBar>
      </div>
    );
  }
}

export default Relay.createContainer(PostListPreivew, {
  fragments: {
    post: () => Relay.QL`
      fragment on Post {
        id,
        title,
        content,
        viewer {
          id,
        }
      }
    `,
  }
});