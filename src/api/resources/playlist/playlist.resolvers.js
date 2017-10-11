import { Playlist } from './playlist.model'

const getPlaylist = (_, __, {user}) => {
  return user
}

const updatePlaylist = (_, {input}) => {

}

export const songResolvers = {
  Query: {
    Playlist: getPlaylist
  },
  Mutation: {
    updatePlaylist
  }
}
