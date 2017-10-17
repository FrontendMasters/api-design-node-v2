import { Playlist } from './playlist.model'

const getPlaylist = (_, {id}) => {
  return Playlist.findById(id).exec()
}

const allPlaylists = () => {
  return Playlist.find({}).exec()
}

export const playlistResolvers = {
  Query: {
    allPlaylists,
    Playlist: getPlaylist,
  }
}
