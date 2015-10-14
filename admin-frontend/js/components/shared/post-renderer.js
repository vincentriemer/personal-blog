import React from 'react';
import Radium from 'radium';
import MTRC from 'markdown-to-react-components';

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
  previewWrapper: {
    flexGrow: 1,
    overflowY: 'scroll',
  },
  preview: {
    padding: '1rem 2rem',
    margin: '0 auto',
  }
};

@Radium
export default class PostListPreivew extends React.Component {
  static defaultProps = {
    title: '',
    caption: '',
    content: '',
    includeTitle: true,
  }

  static propTypes = {
    title: React.PropTypes.string,
    caption: React.PropTypes.string,
    content: React.PropTypes.string,
    includeTitle: React.PropTypes.bool,
  }

  render() {
    var titleElement;
    if (this.props.includeTitle) {
      titleElement = (
        <div>
          <h1>{this.props.title}</h1>
          <p className="caption">{this.props.caption}</p>
        </div>
      );
    }

    return (
      <div style={styles.previewWrapper}>
        <div style={styles.preview} id="baseline" className="typeset section">
          {titleElement}
          {MTRC(this.props.content).tree}
        </div>
      </div>
    );
  }
}