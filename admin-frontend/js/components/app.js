import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';
import IndexLink from 'react-router/lib/IndexLink';
import Radium from 'radium';

var styles = {
  app: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  sidebar: {
    width: 175,
    backgroundColor: '#eee',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    borderRight: '1px solid #aaa',
    flexShrink: 0,
  },
  headerWrapper: {
    height: 60,
    paddingLeft: 15,
  },
  header: {
    width: '100%',
    height: '100%',
    lineHeight: '60px',
    fontWeight: 'bold',
  },
  navigationWrapper: {
    flexGrow: 1,
    paddingLeft: 15,
    paddingTop: 10,
  },
  navigationElementWrapper: {
    height: 30,
    listStyle: 'none',
  },
  navigationLink: {
    height: '100%',
    lineHeight: '30px',
    textDecoration: 'none',
    color: '#888',
    fontSize: '0.9rem'
  },
  navigationLinkActive: {
    color: '#333',
    cursor: 'default',
  },
  childrenWrapper: {
    display: 'flex',
    flexGrow: 1,
  }
};

@Radium
class NavElement extends React.Component {
  static propTypes = {
    title: React.PropTypes.string.isRequired,
    to: React.PropTypes.string.isRequired,
    linkType: React.PropTypes.func.isRequired,
  }

  render() {
    return (
      <li style={styles.navigationElementWrapper}>
        <this.props.linkType
          style={styles.navigationLink}
          to={this.props.to}
          activeStyle={styles.navigationLinkActive}
          >
            {this.props.title}
        </this.props.linkType>
      </li>
    );
  }
}

@Radium
export default class App extends React.Component {
  render() {
    return (
      <div style={styles.app}>
        <div style={styles.sidebar}>
          <div style={styles.headerWrapper}>
            <h1 style={styles.header}>My Blog</h1>
          </div>
          <nav style={styles.navigationWrapper}>
            <ul>
              <NavElement to='/new' title='New Post' linkType={Link} />
              <NavElement to='/posts' title='Posts' linkType={Link} />
            </ul>
          </nav>
        </div>
        <div style={styles.childrenWrapper}>
          {this.props.children}
        </div>
      </div>
    );
  }
};

