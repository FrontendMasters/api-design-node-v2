import createApiSpec from '~/apiSpecs'
import chai, { expect } from 'chai'
import { Playlist } from './playlist.model'

describe('Playlist Model', () => {
  it('should have tilte', () => {
    const playlist = new Playlist({songs: [], favorite: true})

    return playlist.validate()
      .catch(e => expect(e.errors.title).to.exist)
  })

  it('should have songs', () => {
    const playlist = new Playlist({title: 'test', favorite: true})

    return playlist.validate()
      .catch(e => expect(e.errors.songs).to.exist)
  })

  it('should have favorite', () => {
    const playlist = new Playlist({songs: [], title: 'test'})

    return playlist.validate()
      .catch(e => expect(e.errors.favorite).to.exist)
  })
})
createApiSpec(
  Playlist,
  'playlist',
  {title: 'study jams', favorite: true}
)
