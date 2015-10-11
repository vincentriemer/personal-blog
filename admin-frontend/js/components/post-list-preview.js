import React from 'react';
import Relay from 'react-relay';
import Radium from 'radium';
import MTRC from 'markdown-to-react-components';

import TitleBar from './shared/title-bar';
import Button from './shared/button';

// Title should reserve the h1 heading level so move all markdown leves down one
MTRC.configure({
  h1: React.createClass({
    render() { return <h2>{this.props.children}</h2>}
  }),
  h2: React.createClass({
    render() { return <h3>{this.props.children}</h3>}
  }),
  h3: React.createClass({
    render() { return <h4>{this.props.children}</h4>}
  }),
  h4: React.createClass({
    render() { return <h5>{this.props.children}</h5>}
  }),
});

const styles = {
  wrapper: {
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    overflowY: 'hidden',
    alignItems: 'stretch',
  },
  previewWrapper: {
    backgroundColor: '#fff',
    flexGrow: 1,
    overflowY: 'scroll',
  },
  preview: {
    paddingLeft: '3rem',
    paddingRight: '3rem',
    margin: '0 auto',
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
        <TitleBar title={'Preview'}>
          <Button label='Edit' onClick={this.handleMouseClick} />
        </TitleBar>
        <div style={styles.previewWrapper}>
          <div style={styles.preview} id="baseline" className="typeset section">
            <div>
              <h1 style={{letterSpacing: '-0.025em'}}>{post.title}</h1>
              <p className="caption">by Vincent Riemer</p>
            </div>
            {MTRC(post.content).tree}
          </div>
        </div>
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