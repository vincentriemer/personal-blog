'use strict';
import bookshelf from '../bookshelf';

class Post extends Object {}
class User extends Object {}

var viewer = new User();
viewer.id = '1';
viewer.name = 'Anonymous';

function postJSONToObject(model) {
  let data = model.toJSON();
  let output = new Post();
  Object.assign(output, data);
  return output;
}

let PostModel = bookshelf.Model.extend({
  tableName: 'posts',
  hasTimestamps: ['created_at', 'updated_at']
}, {
  list(limit, offset, direction) {
    return new PostModel()
      .query({
        limit: limit,
        offset: offset,
        orderBy: ['created_at', direction]
      })
      .fetchAll()
      .then(posts => posts.toJSON());
  },
  get(id) {
    return new PostModel({id: id})
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
        groupBy: ['id'],
        orderBy: ['created_at', direction]
      })
      .count('id')
      .catch(err => { // hack that catches error when count returns with 0 
        // console.warn(err)
      })
      .then(count => count !== 0 && count !== undefined);
  },
  update(id, data) {
    return new PostModel({id: id})
      .save(data)
      .then(postJSONToObject);
  },
  create(data) {
    return new PostModel(data)
      .save()
      .then(postJSONToObject);
  },
  delete(id) {
    return new PostModel({id: id})
      .delete()
      .then((model) => {
        return model.toJSON().id;
      });
  }
});

module.exports = {
  User,
  getUser: (id) => id === viewer.id ? viewer : null,
  getViewer: () => viewer,
  Post,
  PostModel,
  getPost: PostModel.get,
  getPosts: PostModel.list,
  hasPostsRemaining: PostModel.hasRemaining,
  updatePost: PostModel.update,
  createPost: PostModel.create,
  deletePost: PostModel.delete,
};