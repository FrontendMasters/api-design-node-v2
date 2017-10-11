import createApiSpec from '~/apiSpecs'
import { User } from './user.model'

createApiSpec(User, 'user', {username: 'stu', passwordHash: '1223saf'})
