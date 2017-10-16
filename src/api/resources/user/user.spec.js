import { expect } from 'chai'
import createApiSpec from '~/apiSpecs'
import { User } from './user.model'

describe('User Model', () => {
  it('should have username', () => {
    const user = new User({passwordHash: 'asdf'})

    return user.validate()
      .catch(e => expect(e.errors.username).to.exist)
  })

  it('should have passwordHash', () => {
    const user = new User({username: 'student'})

    return user.validate()
      .catch(e => expect(e.errors.passwordHash).to.exist)
  })
})

createApiSpec(User, 'user', {username: 'stu', passwordHash: '1223saf'})
