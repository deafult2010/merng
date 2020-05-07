const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());

// Switch to apollo-server-express
const { ApolloServer, PubSub } = require('apollo-server-express');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const connectDB = require('./config/db');

// Connect Database
connectDB();

const pubsub = new PubSub();

const PORT = process.env.PORT || 5000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
});

server.applyMiddleware({ app });

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'build', 'index.html'));
  });
}

app.listen({ port: PORT }, () => {
  console.log(`Server ready at ${server.graphqlPath}`);
});
