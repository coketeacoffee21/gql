
const fs = require('fs');
const path = require('path');
const Subscription = require('./resolvers/Subscription')
const Mutation = require('./resolvers/Mutation')

const { PrismaClient } = require('@prisma/client')
const { ApolloServer, PubSub } = require('apollo-server');
const pubsub = new PubSub()

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: async (parent, args, context) => {
      return context.prisma.link.findMany()
    },
  },
  Mutation,
  Subscription
  // User,
  // Link
}

const prisma = new PrismaClient()
// 3
const server = new ApolloServer({
  typeDefs: fs.readFileSync(
    path.join(__dirname, 'schema.graphql'),
    'utf8'
  ),
  resolvers,
  context: ({ req }) => {
    return {
      ...req,
      prisma,
      pubsub,
      userId:
        req && req.headers.authorization
          ? getUserId(req)
          : null
    };
  }
})

server
  .listen()
  .then(({ url }) =>
    console.log(`Server is running on ${url}`)
  );