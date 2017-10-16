import '../src/api/resources/user/user.model'
import '../src/api/resources/playlist/playlist.model'
import '../src/api/resources/song/song.model'
import mongoose from 'mongoose'

mongoose.Promise = global.Promise

export const removeModel = (modelName) => {
  const model = mongoose.model(modelName)
  return new Promise((resolve, reject) => {
    if (!model) {
      return resolve()
    }
    model.remove((err) => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

export const dropDb = () => {
  return mongoose.connect('mongodb://localhost/jams-test', {
    useMongoClient: true
  })
    .then(() => Promise.all(mongoose.modelNames().map(removeModel)))
}
