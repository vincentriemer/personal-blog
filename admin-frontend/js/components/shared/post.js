import React from 'react';
import {Link} from 'react-router';
import DatePicker from 'react-date-picker';
import moment from 'moment';

import Button from './button';
import TitleBar from './title-bar';
import PostRenderer from './post-renderer';
import PostEditor from './post-editor';

const styles = {
  wrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    overflowY: 'hidden',
  },

  titleEditor: {
    border: 0,
    fontSize: '100%',
    width: '100%',
    cursor: 'text',
    color: '#777',
    backgroundColor: 'transparent',
    ':hover': {
      color: 'inherit',
    },
    ':active': {
      color: 'inherit',
    },
    ':focus': {
      color: 'inherit',
      outline: 'none',
    }
  },

  editorAndPreviewWrapper: {
    flexGrow: 1,
    display: 'flex',
    overflowY: 'hidden',
    alignItems: 'stretch',
    height: '100%'
  },

  editorWrapper: {
    width: '50%',
    display: 'flex',
  },

  previewWrapper: {
    borderLeft: '1px solid #aaa',
    overflowY: 'scroll',
    width: '50%',
  },
};

export default class Post extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      title: '',
      content: '',
      published: false,
      published_at: moment()
    }
  }

  updateTitle = (evt) => {
    this.setState({ title: evt.target.value });
  }

  updateBody = (evt) => {
    this.setState({ content: evt.target.value});
  }

  updatePublished = (evt) => {
    var value = evt.target.checked;
    this.setState({ published: value});
  }

  updatePublishedDate = (dateString, _) => {
    this.setState({
      published_at: moment(dateString)
    });
  }

  render() {
    var publishDateComponent, deleteButton;

    if (this.state.id) {
      deleteButton = <Button onClick={this.handleDelete} label="Delete" />;
    }

    let titleEditor = <input 
      onChange={this.updateTitle} 
      style={styles.titleEditor} 
      value={this.state.title}
      placeholder='Enter a title...'
    />;

    return (
      <div style={styles.wrapper}>
        <TitleBar title={titleEditor}>
          <Button label="Save" onClick={this.handleSave} />
          {deleteButton}
        </TitleBar>
        <div style={styles.editorAndPreviewWrapper}>
          <div style={styles.editorWrapper}>
            <PostEditor onChange={this.updateBody} content={this.state.content} />
          </div>
          <div style={styles.previewWrapper}>
            <PostRenderer title={this.state.title} caption="by Vincent Riemer" content={this.state.content} includeTitle={false} />
          </div>
        </div>
      </div>
    );
  }
}

Post.contextTypes = {
  history: React.PropTypes.object,
  route: React.PropTypes.object
}
