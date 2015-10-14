import React from 'react';
import Radium from 'radium';
import ContentEditable from 'react-contenteditable';

const styles = {
  wrapper: {
    padding: 0,
    margin: 0,
    overflow: 'hidden',
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'stretch',
  },
  input: {
    padding: '2rem 1rem',
    border: 0,
    resize: 'none',
    width: '100%',
    whiteSpace: 'pre-wrap',
    backgroundColor: 'transparent',

    ':focus': {
      outline: 'none',
    }
  }
};

@Radium
export default class PostEditor extends React.Component {
  static propTypes = {
    content: React.PropTypes.string,
    onChange: React.PropTypes.func,
  }

  render() {
    return (
      <div className="typeset" style={styles.wrapper}>
        <textarea
          className="code"
          style={styles.input}
          value={this.props.content} 
          onChange={this.props.onChange}
          spellCheck={false}
        />
      </div>
    )
  }
}