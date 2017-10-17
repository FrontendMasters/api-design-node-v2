import createApiSpec from '~/apiSpecs'
import { User } from './user.model'
import { runQuery, dropDb } from '../../../../test/helpers'
import { expect } from 'chai'

createApiSpec(User, 'user', {username: 'stu', passwordHash: '1223saf'})

describe('User', () => {
  let user
  beforeEach(async () => {
    await dropDb()
    user = await User.create({username: 'stu1', passwordHash: '123'})
  })

  afterEach(async () => {
    await dropDb()
  })

  it('should get me', async () => {
    const result = await runQuery(`
      {
        getMe {
          id
          username
        }
      }
    `, {}, user)

    expect(result.errors).to.not.exist
    expect(result.data.getMe).to.be.an('object')
    expect(result.data.getMe.id).to.eql(user.id.toString())
  })

  it('should update me', async () => {
    const newUsername = 'newName'
    
    const result = await runQuery(`
      mutation UpdateMe($input: UpdatedUser!) {
        updateMe(input: $input) {
          id
          username
        }
      }
    `, {input: {id: user.id, username: newUsername}}, user)

    expect(result.errors).to.not.exist
    expect(result.data.updateMe).to.be.an('object')
    expect(result.data.updateMe.id).to.eql(user.id.toString())
    expect(result.data.updateMe.username).to.eql(newUsername)
  })
})
