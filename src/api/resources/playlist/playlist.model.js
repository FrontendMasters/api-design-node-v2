import mongoose from 'mongoose'

export const schema = {
  
}

const playlistSchema = new mongoose.Schema(schema)

export const Playlist = mongoose.model('playlist', playlistSchema)
