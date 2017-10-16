import mongoose from 'mongoose'

export const schema = {
  
}

const songSchema = new mongoose.Schema(schema)

export const Song = mongoose.model('song', songSchema)
