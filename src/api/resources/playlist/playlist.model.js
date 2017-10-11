import mongoose from 'mongoose'

const playlistSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Playlist must have title']
  },

  songs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'song'
  }],

  favorite: {
    type: Boolean,
    required: true,
    default: false
  }
})

export const Playlist = mongoose.model('playlist', playlistSchema)
