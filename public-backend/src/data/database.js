'use strict';
import bookshelf from '../bookshelf';

class Post extends Object {}

let PostModel = bookshelf.Model.extend({
  tableName: 'posts',
  hasTimestamps: ['created_at', 'updated_at']
}, {
  list(limit, offset, direction) {
    return new PostModel()
      .query({
        limit: limit,
        offset: offset,
        whereNotNull: 'published_at',
        where: ['published_at', '<', new Date()],
        orderBy: ['published_at', direction]
      })
      .fetchAll()
      .then(posts => posts.toJSON());
  },
  get(id) {
    return new PostModel({id: id})
      .query({
        whereNotNull: 'published_at',
        where: ['published_at', '<', new Date()],
      })
      .fetch({require: true})
      .then(post => {
        let data = post.toJSON();
        
        let output = new Post();
        Object.assign(output, data);
        
        return output;
      });
  },
  hasRemaining(offset, direction) {
    return new PostModel()
      .query({
        offset: offset,
        whereNotNull: 'published_at',
        where: ['published_at', '<', new Date()],
        groupBy: ['id'],
        orderBy: ['published_at', direction]
      })
      .count('id')
      .catch(err => { // hack that catches error when count returns with 0 
        // console.warn(err)
      })
      .then(count => count !== 0 && count !== undefined);
  },
  getTotal() {
    return new PostModel()
      .query({
        whereNotNull: 'published_at',
        where: ['published_at', '<', new Date()]
      })
      .count();
  }
});

module.exports = {
  Post,
  PostModel,
  getPost: PostModel.get,
  getPosts: PostModel.list,
  hasPostsRemaining: PostModel.hasRemaining,
  getTotalPosts: PostModel.getTotal,
};