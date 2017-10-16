import { expect } from 'chai'
import createApiSpec from '~/apiSpecs'
import { Song, schema } from './song.model'

describe('Song model', () => {
  it('should have tilte', () => {
    expect(schema.title).to.exist
    expect(schema.title.required).to.be.an('array')
  })

  it('should have url', () => {
    expect(schema.url).to.exist
    expect(schema.url.unique).to.equal(true)
    expect(schema.url.required).to.be.an('array')
  })

  it('should have album', () => {
    expect(schema.album).to.exist
  })

  it('should have artist', () => {
    expect(schema.artist).to.exist
  })

  it('should have rating', () => {
    expect(schema.rating).to.exist
    expect(schema.rating.type).to.eql(Number)
  })

  it('should have favorite', () => {
    expect(schema.favorite).to.exist
    expect(schema.favorite.type).to.eql(Boolean)
  })
})

createApiSpec(
  Song,
  'song',
  {title: 'downtown jamming', url: 'http://music.mp3'}
)
