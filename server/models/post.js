'use strict';
import bookshelf from '../bookshelf';

export default bookshelf.Model.extend({
  tableName: 'posts',
  hasTimestamps: ['created_at', 'updated_at']
}, {

  adminList(offset, limit) {
    return new this()
      .query({
        limit: limit,
        offset: offset,
        orderBy: ['created_at', 'desc']
      })
      .fetchAll({
        columns: ['id', 'title', 'published_at', 'created_at', 'updated_at']
      })
      .then(posts => posts.toJSON())
  },

  publicList(offset, limit) {
    return new this()
      .query({
        limit: limit,
        offset: offset,
        whereNotNull: 'published_at',
        where: ['published_at', '<', new Date()],
        orderBy: ['published_at', 'desc']
      })
      .fetchAll({
        columns: ['id', 'title', 'published_at']
      })
      .then(posts => posts.toJSON());
  },

  publicGet(id) {
    return new this({id: id})
      .query({
        whereNotNull: 'published_at',
        where: ['published_at', '<', new Date()],
      })
      .fetch({require: true})
      .then(post => post.toJSON());
  },

  adminGet(id) {
    return new this({id: id})
      .fetch({require: true})
      .then(post => post.toJSON());
  },

  create(payload) {
    return new this(payload)
      .save()
      .then(post => post.toJSON());
  },

  update(id, payload) {
    return new this({id: id})
      .save(payload)
      .then(post => post.toJSON());
  },

  delete(id) {
    return new this({id: id})
      .destroy();
  }
});