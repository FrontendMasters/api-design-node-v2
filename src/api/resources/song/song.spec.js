import { expect } from 'chai'
import createApiSpec from '~/apiSpecs'
import { Song } from './song.model'

describe('Song model', () => {
  it('should have tilte', () => {
    const song = new Song({
      url: 'test',
      album: 'a',
      artist: 'a',
      rating: 1,
      favorite: false
    })

    return song.validate()
      .catch(e => expect(e.errors.title).to.exist)
  })

  it('should have url', () => {
    const song = new Song({
      title: 'test',
      album: 'a',
      artist: 'a',
      rating: 1,
      favorite: false
    })

    return song.validate()
      .catch(e => expect(e.errors.url).to.exist)
  })
})

createApiSpec(
  Song,
  'song',
  {title: 'downtown jamming', url: 'http://music.mp3'}
)
