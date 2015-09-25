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

if (process.env.DB_ENV !== 'graphql-schema') {
  var {
    Post, 
    getPost, 
    getPosts,
    hasPostsRemaining, 
    getUser, 
    User, 
    getViewer,
    updatePost,
    createPost,
    deletePost,
  } = require('./database');
}

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
  return new Buffer(`${PREFIX}${offset}`).toString('base64');
}

function cursorToOffset(cursor) {
  return parseInt(new Buffer(cursor, 'base64').toString('ascii').substring(PREFIX.length), 10);
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
    } else if (type === 'User') {
      return getUser(id);
    } else {
      return null;
    }
  },
  (obj) => {
    if (obj instanceof Post) {
      return postType;
    } else if (obj instanceof User) {
      return userType;
    } else {
      return null;
    }
  }
);

var userType = new GraphQLObjectType({
  name: 'User',
  description: 'A person who uses our app',
  fields: () => ({
    id: globalIdField('User'),
    posts: {
      type: postConnection,
      description: 'A person\'s collection of posts',
      args: connectionArgs,
      resolve: getPagedPosts,
    }
  }),
  interfaces: [nodeInterface]
})

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

var {
  connectionType: postConnection,
  edgeType: postEdge
} = 
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

  after = getOffset(after, 0);
  before = getOffset(before, 0);

  let nodes, begin;
  let hasPreviousPage = false;
  let hasNextPage = false;

  if (first !== null && first !== undefined) {
    begin = after;
    nodes = await getPosts(first, after, 'desc');

    hasNextPage = await hasPostsRemaining(after + first, 'desc');
  }

  if (last !== null && last !== undefined) {
    begin = before;
    let newNodes = await getPosts(last, before, 'asc');
    if (nodes !== undefined) {
      nodes = arrayUnion(newNodes, nodes, areNodesEqual)
    } else {
      nodes = newNodes;
    }

    hasPreviousPage = await hasPostsRemaining(before + last, 'asc');
  }

  if (nodes.length === 0) {
    return emptyConnection();
  }

  let edges = nodes.map((node, index) => {
    let newPost = new Post();
    Object.assign(newPost, node);

    return {
      cursor: offsetToCursor(begin + index + 1),
      node: newPost,
    };
  });

  const output = {
    edges: edges,
    pageInfo: {
      startCursor: edges[0].cursor,
      endCursor: edges[edges.length - 1].cursor,
      hasPreviousPage: hasPreviousPage,
      hasNextPage: hasNextPage,
    }
  };

  return output;
}

var updatePostMutation = mutationWithClientMutationId({
  name: 'UpdatePost',
  inputFields: {
    id: {
      type: new GraphQLNonNull(GraphQLString)
    },
    title: {
      type: new GraphQLNonNull(GraphQLString)
    },
    content: {
      type: new GraphQLNonNull(GraphQLString)
    },
    published_at: {
      type: GraphQLString
    }
  },
  outputFields: {
    post: {
      type: postType,
      resolve: (payload) => payload
    }
  },
  mutateAndGetPayload: (payload => {
    var id = fromGlobalId(payload.id).id;
    var data = {
      title: payload.title,
      content: payload.content,
      published_at: payload.published_at
    };
    return updatePost(id, data);
  })
});

var createPostMutation = mutationWithClientMutationId({
  name: 'CreatePost',
  inputFields: {
    title: {
      type: new GraphQLNonNull(GraphQLString)
    },
    content: {
      type: new GraphQLNonNull(GraphQLString)
    },
    published_at: {
      type: GraphQLString
    }
  },
  outputFields: {
    viewer: {
      type: userType,
      resolve: () => getViewer()
    },
    newPostEdge: {
      type: postEdge,
      resolve: (newPost) => {
        return {
          cursor: offsetToCursor(newPost.id),
          node: newPost
        }
      }
    }
  },
  mutateAndGetPayload: (payload => {
    var data = {
      title: payload.title,
      content: payload.content,
      published_at: payload.published_at
    };
    return createPost(data);
  })
});

var deletePostMutation = mutationWithClientMutationId({
  name: 'DeletePost',
  inputFields: {
    postId: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  outputFields: {
    viewer: {
      type: userType,
      resolve: getViewer,
    },
    deletedPostId: {
      type: GraphQLString,
      resolve: (id) => id,
    }
  },
  mutateAndGetPayload: (({postId}) => {
    return deletePost(fromGlobalId(postId));
  })
});

var queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: nodeField,
    viewer: {
      type: userType,
      resolve: () => getViewer(),
    }
  })
});

var mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    updatePost: updatePostMutation,
    createPost: createPostMutation,
    deletePost: deletePostMutation,
  })
});

export var Schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType
});
