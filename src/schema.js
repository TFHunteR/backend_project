const { createSchema } = require('graphql-yoga')
const typeDefs = require('./typeDefs')
const Query = require('./query')
const Mutation = require('./mutation')
const TypeDefResolvers = require('./typeDefResolvers')

module.exports = createSchema({
  typeDefs,
  resolvers: { Query, Mutation, ...TypeDefResolvers }
})