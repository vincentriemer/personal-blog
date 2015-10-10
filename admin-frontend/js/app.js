import 'babel/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import {Router, Route, IndexRoute, Redirect} from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

import App from './components/app';
import PostList from './components/post-list';
import UpdatePost from './components/update-post';
import CreatePost from './components/create-post';
import PostListPreview from './components/post-list-preview';
import ReactRouterRelay from 'react-router-relay';

require('../sass/style.scss');

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
    <Route component={App}>
      <Route
        path="/posts"
        component={PostList}
        queries={HomeQueries}>
        <Route
          path=":id"
          component={PostListPreview}
          queries={PostQueries}
        />
      </Route>
      <Route
        path="/edit/:id"
        component={UpdatePost}
        queries={PostQueries}
      />
      <Route
        path="/new"
        component={CreatePost}
        queries={HomeQueries}
      />
      <Redirect from="/" to="/posts" />
    </Route>
  </Router>,
  document.getElementById('root')
);

