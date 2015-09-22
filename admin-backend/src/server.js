'use strict';
import express from 'express';
import graphQLHTTP from 'express-graphql';
import path from 'path';
import {Schema} from './data/schema';

let GRAPHQL_PORT = 3002 || process.env.PORT;

let graphQLServer = express();
graphQLServer.use('/', graphQLHTTP({schema: Schema, pretty: true}));
graphQLServer.listen(GRAPHQL_PORT, () => {
  console.log(`Public GraphQL Server is now running on port ${GRAPHQL_PORT}`);
});
