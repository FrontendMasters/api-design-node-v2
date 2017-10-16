import createApiSpec from '~/apiSpecs'
import chai, { expect } from 'chai'
import { Playlist, schema } from './playlist.model'
import mongoose from 'mongoose'

describe('Playlist Model', () => {
  it('should have tilte', () => {
    expect(schema.title).to.exist
    expect(schema.title.type).to.eql(String)
    expect(schema.title.required).to.be.an('array')
  })

  it('should have songs', () => {
    expect(schema.songs).to.exist
    expect(schema.songs).to.be.an('array')
    expect(schema.songs[0].type).to.eql(mongoose.Schema.Types.ObjectId)
    expect(schema.songs[0].ref).to.eql('song')
  })

  it('should have favorite', () => {
    expect(schema.favorite).to.exist
    expect(schema.favorite.type).to.eql(Boolean)
    expect(schema.favorite.required).to.equal(true)
    expect(schema.favorite.default).to.equal(false)
  })
})
createApiSpec(
  Playlist,
  'playlist',
  {title: 'study jams', favorite: true}
)
