const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const typeDefs = require('./schemas/employeeSchema');
const resolvers = require('./resolvers/employeeResolvers');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Initialize Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

// Start Apollo Server
async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  // Start the Express server
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startServer(); // Call the function to start the server
