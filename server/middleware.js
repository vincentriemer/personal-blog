'use strict';
import parse from 'co-body';

export function* TypeCheck(next) {
  if (this.method === 'post') {
    switch (this.request.type) {
      case 'application/json':
        this.request.body = yield parse.json(this);
        break;
      case 'application/graphql':
        this.request.body = yield parse.text(this);
        break;
      default:
        this.throw(415);
    }
  }
  yield next;
}