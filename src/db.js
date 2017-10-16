import mongoose from 'mongoose'
mongoose.Promise = global.Promise

export const connect = () => {
  return mongoose.connect('mongodb://localhost/jams', {
    useMongoClient: true
  })
}
