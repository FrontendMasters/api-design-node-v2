import createApiSpec from '~/apiSpecs'
import { Song } from './song.model'

createApiSpec(
  Song,
  'song',
  {title: 'downtown jamming', url: 'http://music.mp3'}
)
