import { expect } from 'chai'
import { dropDb } from '~/testhelpers'
import { controllers } from './query'
import { User } from '../resources/user/user.model'

describe('Modules', () => {
  beforeEach(async () => {
    await dropDb()
  })

  afterEach(async () => {
    await dropDb()
  })

  describe('query', () => {
    describe('createOne', () => {
      it('should create a document', async () => {
        const result = await controllers.createOne(User, {
          username: 'student12',
          passwordHash: '1234abcd'
        })
        expect(result).to.be.ok
        expect(result.id).to.be.ok
        expect(result.username).to.equal('student12')
      })
    })
    describe('updateOne', () => {
      it('should update a document', async () => {
        const user = await controllers.createOne(User, {
          username: 'studentx',
          passwordHash: '1234sdkfj'
        })

        const newUsername = 'newStudentZ'
        const updatedUser = await controllers.updateOne(user, {username: newUsername})

        expect(updatedUser.username).to.equal(newUsername)
        expect(updatedUser.id).to.equal(user.id)
      })
    })

    describe('deleteOne', () => {
      it('should delete a document', async () => {
        const user = await controllers.createOne(User, {
          username: 'studentx',
          passwordHash: '1234sdkfj'
        })

        const deletedUser = await controllers.deleteOne(user)

        expect(deletedUser.id).to.equal(user.id)
        expect(await User.findById(user.id)).to.equal(null)
      })
    })

    describe('getOne', () => {
      it('should get one document', async () => {
        const user = await controllers.createOne(User, {
          username: 'studentx',
          passwordHash: '1234sdkfj'
        })

        const foundUser = await controllers.getOne(user)

        expect(foundUser).to.equal(user)
      })
    })

    describe('getAll', () => {
      it('should get all documnets', async () => {
        const usernames = ['student1', 'student2']

        const users = await Promise.all(usernames.map(async username => {
          const user = await controllers.createOne(User, {username, passwordHash: '1234qwer'})
          return user.toJSON()
        }))

        const allUsers = (await controllers.getAll(User))
          .map(user => user.toJSON())

        expect(allUsers).to.have.length(users.length)
      })
    })

    describe('findByParam', () => {
      it('should find model my id', async () => {
        const user = (await controllers.createOne(User, {
          username: 'student1',
          passwordHash: '1234qwe'
        }))
          .toJSON()

        const foundUser = (await controllers.findByParam(User, user._id))
          .toJSON()

        expect(foundUser).to.deep.eql(user)
      })
    })
  })
})
