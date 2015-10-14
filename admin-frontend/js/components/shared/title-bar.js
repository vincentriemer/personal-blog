import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';
import Radium from 'radium';

const styles = {
  titleWrapper: {
    height: 60,
    borderBottom: '1px solid #aaa',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
  },
  titleElement: {
    marginRight: 15,
    marginLeft: 15,
    flexGrow: 1,
  },
  title: {
  }
};

@Radium
export default class TitleBar extends React.Component {
  static propTypes = {
    title: React.PropTypes.node,
  }

  render() {
    return (
      <div style={styles.titleWrapper}>
        <h1 style={[styles.title, styles.titleElement]}>{this.props.title}</h1>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}