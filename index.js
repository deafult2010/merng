// Switch to apollo-server-express
const { ApolloServer, PubSub } = require('apollo-server');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const connectDB = require('./config/db');

// Connect Database
connectDB();

const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
});

server.listen({ port: 5000 }).then((res) => {
  console.log(`Server running on port ${res.url}`);
});
