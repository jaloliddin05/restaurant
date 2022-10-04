require("dotenv").config();
const http = require("http");
const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const mongo = require("./utils/mongoose");
const modules = require("./moduls");

const app = express();

let apolloServer = null;

async function startServer() {
  apolloServer = new ApolloServer({
    modules,
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
}
startServer();

mongo()
  .then(() => console.log("Database successfully connected"))
  .catch((err) => console.log(err));

const httpServer = http.createServer(app);

httpServer.listen(9000, console.log(9000 + apolloServer.graphqlPath));
