import 'babel/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import {Router, Route, IndexRoute} from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

import App from './components/app';
import PostList from './components/post-list';
import UpdatePost from './components/update-post';
import CreatePost from './components/create-post';
import ReactRouterRelay from 'react-router-relay';

var HomeQueries = {
  viewer: (Component) => Relay.QL`
    query {
      viewer
    }
  `,
};

var PostQueries = {
  post: (Component) => Relay.QL`
    query {
      node(id: $id)
    }
  `,
}

ReactDOM.render(
  <Router
    history={createBrowserHistory()}
    createElement={ReactRouterRelay.createElement}>
    <Route
      path="/"
      component={App}
    >
      <IndexRoute
        component={PostList}
        queries={HomeQueries}
      />
      <Route
        path="post/:id"
        component={UpdatePost}
        queries={PostQueries}
      />
      <Route
        path="new"
        component={CreatePost}
        queries={HomeQueries}
      />
    </Route>
  </Router>,
  document.getElementById('root')
);

