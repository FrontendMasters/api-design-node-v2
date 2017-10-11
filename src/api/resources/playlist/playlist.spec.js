import createApiSpec from '~/apiSpecs'
import { Playlist } from './playlist.model'

createApiSpec(
  Playlist,
  'playlist',
  {title: 'study jams', favorite: true}
)
