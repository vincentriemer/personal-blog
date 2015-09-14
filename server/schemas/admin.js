'use strict';
import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList
} from 'graphql/type';

import { Post, Posts } from '../models';
import PostType from '../types/post';
import PostsType from '../types/posts';

let queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    adminPost: {
      type: PostType,
      args: {
        id: {
          description: 'The id of the post.',
          type: new GraphQLNonNull(GraphQLInt)
        }
      },
      resolve: (root, {id}) => new Post()
        .where({id: id})
        .fetch()
        .then(post => post.toJSON())
    },
    adminPosts: {
      type: new GraphQLList(PostType),
      resolve: () => new Posts()
        .query({
          orderBy: ['created_at', 'desc']
        })
        .fetch()
        .then(posts => posts.toJSON())
    }
  })
});

let mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    createPost: {
      type: PostType,
      args: {
        title: {
          description: 'The title of the post.',
          type: new GraphQLNonNull(GraphQLString)
        },
        content: {
          description: 'The content of the post.',
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve: (root, payload) => new Post(payload)
        .save()
        .then(post => post.toJSON())
    },
    
    updatePost: {
      type: PostType,
      args: {
        id: {
          description: 'The unique id of the post you want to edit.',
          type: new GraphQLNonNull(GraphQLInt)
        },
        title: {
          description: 'The title of the post.',
          type: GraphQLString
        },
        content: {
          description: 'The content of the post.',
          type: GraphQLString
        }
      },
      resolve: (root, payload) => {
        const id = payload.id;
        delete payload['id'];
        
        return new Post({ id: id })
          .save(payload)
          .then(post => post.toJSON());
      }
    },
    
    publishPost: {
      type: PostType,
      args: {
        id: {
          description: 'The id of the post you would like to publish',
          type: new GraphQLNonNull(GraphQLInt)
        }
      },
      resolve: (root, {id}) => new Post({id: id})
        .save({ published_at: new Date() })
    },
    
    unpublishPost: {
      type: PostType,
      args: {
        id: {
          description: 'The id of the post you would like to unpublish',
          type: new GraphQLNonNull(GraphQLInt)
        }
      },
      resolve: (root, {id}) => new Post({ id: id })
        .save({ published_at: null })
    },
    
    deletePost: {
      args: {
        id: {
          description: 'The unique id of the post you want to delete.',
          type: new GraphQLNonNull(GraphQLInt)
        }
      },
      resolve: (root, {id}) => new Post({id: id}).destroy()
    }
  })
});

export default new GraphQLSchema({
  query: queryType,
  mutation: mutationType
});
