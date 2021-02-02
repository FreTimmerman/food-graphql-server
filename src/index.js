
import "reflect-metadata";
import { buildSchema } from "type-graphql";

import * as path from "path";
import { ApolloServer, gql } from "apollo-server";
import { StoreResolver, ReservationResolver } from './resolvers.js';

// ⚽️  Goal
// --------

// We want to create a webapp to reserve products (food).
// Some ingredients we need: a store, products and reservations.
// First of all we want a list of stores. After we have chosen
// a store, we get a list of products (query) of that store.
// We pick some products, pick a quantity, and we make a reservation (mutation)

// 🏪  Exercise 1
// --------------

// 1) First we create two files. One for our type definitions, `typeDefs.js`,
//    and one for our resolver functions, `resolvers.js`.
// 2) Create a GraphQL type definition for our store. A store has an id and a name.
// 3) Create a Query `stores` to get a list of stores.
// 4) Create a resolver function that returns the list of stores.
// 5) Try out the GraphQL query in the GraphQL Playground (🚀 http://localhost:4000/)



// create the schema using TypeGraphQL, pass the resolver
const schema = await buildSchema({
  resolvers: [StoreResolver, ReservationResolver],
  //nullableByDefault: true,
  emitSchemaFile: path.resolve(".", "schema.gql"),
});

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({ schema });

// This `listen` method launches a web-server. Existing apps
// can utilize middleware options.
server.listen()
  .then(({ url }) => {
    console.log(`🚀  Food GraphQL Server ready at ${url}.
⛄️  Go to this url to play with GraphQL in the GraphQL Playground.`);
  });
