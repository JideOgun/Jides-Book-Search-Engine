const express = require('express');
const path = require('path');
const db = require('./config/connection');
// const routes = require('./routes');
const { ApolloServer } = require('apollo-server-express');

// importing the typeDefs and resolvers
const { typeDefs, resolvers } = require('./schemas');


const app = express();
const PORT = process.env.PORT || 3001;

const startServer = async () => {
  // create new Apollo server and pass in schema data
  const server = new ApolloServer({
    typeDefs,
    resolvers
  })

  // starting the apollo server
  await server.start();
// integrating Apollo server with Express application as middleware
server.applyMiddleware({ app });
// log wehre to go test GQL API
console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`)

}

startServer();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
