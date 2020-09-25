const { GraphQLServer } = require('graphql-yoga');
const { PrismaClient } = require('@prisma/client');
const { DateResolver } = require('graphql-scalars');
const Query = require('./resolvers/Queries');
const Mutation = require('./resolvers/Mutations');
const Task = require('./resolvers/Task');

const prisma = new PrismaClient();

const resolvers = {
    Query,
    Mutation,
    Date: DateResolver,
    Task
};

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: { prisma }
});

server.start(() => console.log(`Server is running on http://localhost:4000`));