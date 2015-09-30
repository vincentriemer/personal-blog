import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';
import IndexLink from 'react-router/lib/IndexLink';
import Radium from 'radium';

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
            <h1 style={styles.header}>Personal-Blog</h1>
          </div>
          <nav style={styles.navigationWrapper}>
            <ul>
              <NavElement to='/new' title='New Post' linkType={Link} />
              <NavElement to='/' title='Content' linkType={IndexLink} />
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

var styles = {
  app: {
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  sidebar: {
    width: 225,
    backgroundColor: '#eee',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    borderRight: '1px solid #aaa',
  },
  headerWrapper: {
    height: 60,
    paddingLeft: 15,
  },
  header: {
    fontFamily: 'Avenir Next, sans-serif',
    fontSize: '24px',
    fontWeight: 'bold',
    width: '100%',
    height: '100%',
    lineHeight: '60px',
  },
  navigationWrapper: {
    flexGrow: 1,
    paddingLeft: 15,
    paddingTop: 10,
  },
  navigationElementWrapper: {
    height: 30,
  },
  navigationLink: {
    height: '100%',
    lineHeight: '30px',
    textDecoration: 'none',
    fontFamily: 'Avenir Next, sans-serif',
    color: '#888',
    fontWeight: 500
  },
  navigationLinkActive: {
    color: '#333',
    cursor: 'default',
  },
  childrenWrapper: {
    flexGrow: 1,
    overflowY: 'scroll',
  }
};

