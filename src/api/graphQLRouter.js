import { makeExecutableSchema } from 'graphql-tools'
import { userType, userResolvers } from './resources/user'
import merge from 'lodash.merge'
import { graphqlExpress } from 'apollo-server-express'

// root definitions fop GraphQL
const baseSchema = `
  schema {
    query: Query
  }
`

const schema = makeExecutableSchema({
  // all the graphql files
  typeDefs: [
    baseSchema,
    userType
  ],
  // all the resolvers
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
