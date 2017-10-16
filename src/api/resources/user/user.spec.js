import { expect } from 'chai'
import createApiSpec from '~/apiSpecs'
import { User, schema } from './user.model'

describe('User Model', () => {
  it('should have username', () => {
    expect(schema.username).to.exist
    expect(schema.username.type).to.eql(String)
    expect(schema.username.required).to.equal(true)
    expect(schema.username.unique).to.equal(true)
  })

  it('should have passwordHash', () => {
    expect(schema.passwordHash).to.exist
    expect(schema.username.type).to.eql(String)
    expect(schema.username.required).to.equal(true)
  })
})

createApiSpec(User, 'user', {username: 'stu', passwordHash: '1223saf'})
