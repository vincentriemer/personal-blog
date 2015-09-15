import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions,
} from 'graphql-relay';

import {
  Post,
  getPost,
  getPosts,
  getTotalPosts,
  getPostsRemaining,
} from './database';

const PREFIX = 'postconnection:';

function emptyConnection() {
  return {
    edges: [],
    pageInfo: {
      startCursor: null,
      endCursor: null,
      hasPreviousPage: false,
      hasNextPage: false
    }
  };
}

function offsetToCursor(offset) {
  return `${PREFIX}${offset}`;
}

function cursorToOffset(cursor) {
  return parseInt(cursor.substring(PREFIX.length), 10);
}

function getOffset(cursor, defaultOffset) {
  if (cursor === undefined || cursor === null) {
    return defaultOffset;
  }
  let offset = cursorToOffset(cursor);
  if (isNaN(offset)) {
    return defaultOffset;
  }
  return offset;
}

var {nodeInterface, nodeField} = nodeDefinitions(
  (globalId) => {
    var {type, id} = fromGlobalId(globalId);
    if (type === 'Post') {
      return getPost(id);
    } else {
      return null;
    }
  },
  (obj) => {
    if (obj instanceof Post) {
      return postType;
    } else {
      return null;
    }
  }
);

var postType = new GraphQLObjectType({
  name: 'Post',
  description: 'A post on the blog',
  fields: () => ({
    id: globalIdField('Post'),
    created_at: {
      type: GraphQLString,
      description: 'The date when the post was created',
    },
    updated_at: {
      type: GraphQLString,
      description: 'The date when the post was last updated',
    },
    title: {
      type: GraphQLString,
      description: 'The title of the blog post',
    },
    content: {
      type: GraphQLString,
      description: 'The content of the blog post',
    },
    published_at: {
      type: GraphQLString,
      description: 'The date when the post was published',
    },
  }),
  interfaces: [nodeInterface],
});

var {connectionType: postConnection} = 
  connectionDefinitions({name: 'Post', nodeType: postType});

function arrayUnion(arr1, arr2, equalityFunc) {
  let union = arr1.concat(arr2);
  for (let i = 0; i < union.length; i++) {
    for (let j = i+1; j < union.length; j++) {
      if (equalityFunc(union[i], union[j])) {
        union.splice(j, 1);
        j--;
      }
    }
  }
  return union;
}

function areNodesEqual(p1, p2) {
  return p1.id === p2.id;
}

async function getPagedPosts(post, args) {
  let {before, after, first, last} = args;

  let nodes, begin;
  let hasPreviousPage = false;
  let hasNextPage = false;

  if (first !== null && first !== undefined) {
    begin = after;
    nodes = await getPosts(first, after, 'desc');

    let remaining = await getPostsRemaining(after + first + 1, 'desc');
    if (remaining !== 0) {
      hasNextPage = true;
    }
  }

  if (last !== null && last !== undefined) {
    begin = before;
    let newNodes = await getPosts(last, before, 'asc');
    if (nodes !== undefined) {
      nodes = arrayUnion(newNodes, nodes, areNodesEqual)
    } else {
      nodes = newNodes;
    }

    let remaining = await getPostsRemaining(before + last + 1, 'asc');
    if (remaining !== 0) {
      hasPreviousPage = true;
    }
  }

  if (nodes.length === 0) {
    return emptyConnection();
  }

  let edges = nodes.map((node, index) => {
    let newPost = new Post();
    Object.assign(newPost, node);

    return {
      cursor: offsetToCursor(begin + index),
      node: newPost,
    };
  });

  return {
    edges: edges,
    pageInfo: {
      startCursor: edges[0].cursor,
      endCursor: edges[edges.length - 1].cursor,
      hasPreviousPage: hasPreviousPage,
      hasNextPage: hasNextPage,
    }
  };
}

var queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: nodeField,
    posts: {
      type: postConnection,
      description: 'A list of all the published posts on the blog',
      args: connectionArgs,
      resolve: getPagedPosts,
    }
  })
});

export var Schema = new GraphQLSchema({
  query: queryType,
});
