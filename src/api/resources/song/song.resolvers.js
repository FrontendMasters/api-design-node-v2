import { Song } from './song.model'

const getSong = (_, __, {user}) => {
  return user
}

const updateSong = (_, {input}) => {

}

export const songResolvers = {
  Query: {
    Song: getSong
  },
  Mutation: {
    updateSong
  }
}
