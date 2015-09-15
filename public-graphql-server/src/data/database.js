'use strict';
import bookshelf from '../bookshelf';

class Post extends Object {}

let PostModel = bookshelf.Model.extend({
  tableName: 'posts',
  hasTimestamps: ['created_at', 'updated_at']
}, {
  list(first, after) {
    return new this()
      .query({
        limit: first,
        offset: after,
        whereNotNull: 'published_at',
        where: ['published_at', '<', new Date()],
        orderBy: ['published_at', 'desc']
      })
      .fetchAll({ columns: ['id'] })
      .then(posts => posts.toJSON());
  },
  get(id) {
    return new this({id: id})
      .query({
        whereNotNull: 'published_at',
        where: ['published_at', '<', new Date()],
      })
      .fetch({require: true})
      .then(post => {
        let data = post.toJSON();
        
        let output = new Post();
        Object.assign(output, data);
        // output.id = data.id;
        // output.title = data.title;
        // output.content = data.content;
        // output.created_at = data.created_at;
        // output.updated_at = data.updated_at;
        // output.published_at = data.published_at;
        
        return output;
      });
  }
});

export {
  Post,
  PostModel,
}