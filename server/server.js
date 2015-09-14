/// <reference path="../typings/node/node.d.ts"/>
'use strict';
import koa from 'koa';
import { graphql } from 'graphql';
import Router from './router';
// import publicSchema from './src/schemas/public';
// import adminSchema from './src/schemas/admin';

let app = koa();
let router = Router();

// router.post('/graphql/public', graphqlTypeCheck, function* (next) {
//   this.body = yield graphql(publicSchema, this.request.body).catch(error => { this.throw(500, error); });
// });

// router.post('/graphql/admin', graphqlTypeCheck, function* (next) {
//   this.body = yield graphql(adminSchema, this.request.body).catch(error => { this.throw(500, error); });
// });

// router.get('*', function* (next) {

// });

app
  .use(router.routes())
  .use(router.allowedMethods());

const port = process.env.PORT || 3000;
console.info(`Listening on port ${port}`);
app.listen(port);
