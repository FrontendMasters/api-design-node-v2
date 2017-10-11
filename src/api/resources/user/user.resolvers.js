import { User } from './user.model'

const getMe = (_, __, {user}) => {
  return user
}

const updateMe = (_, {input}) => {

}

export const userResolvers = {
  Query: {
    getMe
  },
  Mutation: {
    updateMe
  }
}
