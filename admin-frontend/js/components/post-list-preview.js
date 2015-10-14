import React from 'react';
import Relay from 'react-relay';
import Radium from 'radium';

import TitleBar from './shared/title-bar';
import Button from './shared/button';
import PostRenderer from './shared/post-renderer';

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    overflowY: 'hidden',
    alignItems: 'stretch',
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
    let {post: { title, content }} = this.props;
    return (
      <div style={styles.wrapper}>
        <TitleBar title={'Preview'}>
          <Button label='Edit' onClick={this.handleMouseClick} />
        </TitleBar>
        <PostRenderer title={title} caption="by Vincent Riemer" content={content} />
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