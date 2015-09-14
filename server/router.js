'use strict';
import Router from 'koa-router';
import { Post } from './models';
import { TypeCheck } from './middleware';

export default function() {
  const adminPostsRouter = new Router()
    .get('/posts', function*(next) {
      const offset = this.query.offset || 0,
             limit = this.query.limit || 10;
      this.body = yield Post.adminList(offset, limit);
    })
    .post('/posts', function*(next) {
      this.body = yield Post.create(this.request.body);
      this.status = 201
    })
    .get('/posts/:id', function*(next) {
      this.body = yield Post.adminGet(this.params.id);
    })
    .put('/posts/:id', function*(next) {
      this.body = yield Post.update(this.params.id, this.request.body);
    })
    .del('/posts/:id', function*(next) {
      yield Post.delete(this.params.id);
      this.status = 204;
    });

  const publicPostsRouter = new Router()
    .get('/posts', function *(next) {
      const offset = this.query.offset || 0,
             limit = this.query.limit || 10;
      this.body = yield Post.publicList(offset, limit);
    })
    .get('/posts/:id', function*(next) {
      this.body = yield Post.publicGet(this.params.id);
    });

  const apiRouter = new Router()
    .use('/admin', adminPostsRouter.routes())
    .use('/public', publicPostsRouter.routes());

  const router = new Router()
    .use('/api', TypeCheck, apiRouter.routes());

  return router;
}