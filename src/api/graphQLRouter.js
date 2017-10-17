import { makeExecutableSchema } from 'graphql-tools'
import { userType, userResolvers } from './resources/user'
import { songType, songResolvers } from './resources/song'
import { playlistType, playlistResolvers } from './resources/playlist'
import merge from 'lodash.merge'
import { graphqlExpress } from 'apollo-server-express'

const baseSchema = `
  schema {
    query: Query
    mutation: Mutation
  }
`

export const schema = makeExecutableSchema({
  typeDefs: [
    baseSchema,
    userType,
    songType,
    playlistType
  ],
  resolvers: merge(
    {},
    userResolvers,
    songResolvers,
    playlistResolvers
  )
})


export const graphQLRouter = graphqlExpress((req) => ({
  schema,
  context: {
    req,
    user: req.user
  }
}))
