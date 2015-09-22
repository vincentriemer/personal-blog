import 'babel/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import {Router, Route, IndexRoute} from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import ReactRouterRelay from 'react-router-relay';

import App from './components/app';
import Post from './components/post';

var AppQueries = {
  viewer: () => Relay.QL`query { viewer }`
};

var PostQueries = {
  post: () => Relay.QL`query { node(id: $id) }`
};

ReactDOM.render(
  <Router
    history={createBrowserHistory()}
    createElement={ReactRouterRelay.createElement}>
    <Route
      path="/"
      component={App}
      queries={AppQueries}
    />
    <Route
      path="/posts/:id"
      component={Post}
      queries={PostQueries}
      queryParams={['first']}
    />
  </Router>,
  document.getElementById('root')
);

