import { User } from './user.model'
import { Playlist } from '../playlist/playlist.model'
import merge from 'lodash.merge'

const getMe = (_, __, {user}) => {
  return user
}

const updateMe = (_, {input}, {user}) => {
  merge(user, input)
  return user.save()
}

export const userResolvers = {
  Query: {
    getMe
  },
  Mutation: {
    updateMe
  },

  User: {
    playlists() {
      return Playlist.find({}).exec()
    }
  }
}
