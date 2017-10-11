import mongoose from 'mongoose'
import appConfig from './config'
mongoose.Promise = global.Promise

export const connect = (config = appConfig) => {
  return mongoose.connect(config.db.url, {
    useMongoClient: true
  })
}
