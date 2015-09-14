'use strict';
import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList
} from 'graphql/type';

let PostType = new GraphQLObjectType({
  name: 'Post',
  description: 'An individual blog post.',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The unique id of the blog post.'
    },
    title: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The title of the blog post.'
    },
    content: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The content of the blog post.'
    },
    published_at: {
      type: GraphQLString,
      description: 'The date the post is published to the public.'
    }
  })
});

export default PostType;