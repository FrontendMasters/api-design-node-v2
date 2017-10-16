import mongoose from 'mongoose'

export const schema = {
  title: {
    type: String,
    required: [true, 'Song must have a title']
  },

  url: {
    type: String,
    unique: true,
    required: [true, 'Song must have a url']
  },

  album: String,

  artist: String,

  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },

  favorite: {
    type: Boolean,
    required: true,
    default: false
  }
}

const songSchema = new mongoose.Schema(schema)

export const Song = mongoose.model('song', songSchema)
