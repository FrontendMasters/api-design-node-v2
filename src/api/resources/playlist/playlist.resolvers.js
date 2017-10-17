import { Playlist } from './playlist.model'
import { Song } from '../song/song.model'

const getPlaylist = (_, {id}) => {
  return Playlist.findById(id).exec()
}

const allPlaylists = () => {
  return Playlist.find({}).exec()
}

const newPlaylist = (_, {input}) => {
  return Playlist.create(input)
}

const updatePlaylist = (_, {input}) => {
  const {id, ...update} = input

  return Playlist.findByIdAndUpdate(id, update, {new: true}).exec()
}

export const playlistResolvers = {
  Query: {
    allPlaylists,
    Playlist: getPlaylist,
  },

  Mutation: {
    newPlaylist,
    updatePlaylist
  },

  Playlist: {
    async songs(playlist) {
      console.log('getting songs')
      const populated = await playlist
        .populate('songs')
        .execPopulate()

      return populated.songs
    }
  }
}
