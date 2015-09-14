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

let queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    post: {
      type: PostType,
      args: {
        id: {
          description: 'The id of the post.',
          type: new GraphQLNonNull(GraphQLInt)
        }
      },
      resolve: (root, {id}) => new Post({ id: id })
        .query({
          whereNotNull: 'published_at',
          where: ['published_at', '<', new Date()],
        })
        .fetch()
        .then(post => post.toJSON())
    },
    posts: {
      type: new GraphQLList(PostType),
      args: {
        offset: {
          description: 'The number of results to skip from returning.',
          type: GraphQLInt
        },
        limit: {
          description: 'The number of results to return.',
          type: GraphQLInt
        }
      },
      resolve: (root, {offset, limit}) => {
        offset = offset || 0;
        limit = limit || 5;
        
        return new Posts()
          .query({
            limit: limit,
            offset: offset,
            whereNotNull: 'published_at',
            where: ['published_at', '<', new Date()],
            orderBy: ['published_at', 'desc']
          })
          .fetch()
          .then(posts => posts.toJSON());
      }
    }
  })
});

export default new GraphQLSchema({
  query: queryType
});
