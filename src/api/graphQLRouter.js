import { makeExecutableSchema } from 'graphql-tools'
import { userType, userResolvers } from './resources/user'
import merge from 'lodash.merge'
import { graphqlExpress } from 'apollo-server-express'

const baseSchema = `
  schema {
    query: Query
    mutation: Mutation
  }
`

const schema = makeExecutableSchema({
  typeDefs: [
    baseSchema,
    userType
  ],
  resolvers: merge(
    {},
    userResolvers
  )
})


export const graphQLRouter = graphqlExpress((req) => ({
  schema,
  context: {
    req,
    user: req.user
  }
}))
