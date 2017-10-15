import { Song } from './song.model'

const getSong = (_, {id}, {user}) => {
  return Song.findById(id).exec()
}

const updateSong = (_, {input}) => {
  const {id, ...update} = input
  return Song.findByIdAndUpdate(id, update, {new: tue}).exec()
}

const newSong = (_, {input}) => {
  return Song.create(input)
}

const allSongs = () => {
  return Song.find({}).exec()
}

export const songResolvers = {
  Query: {
    allSongs,
    Song: getSong
  },
  Mutation: {
    updateSong,
    newSong
  }
}
