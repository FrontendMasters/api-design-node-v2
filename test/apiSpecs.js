import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import { dropDb } from './helpers'
import app from '../src/server'
import { signToken } from '../src/api/modules/auth'
import { User } from '../src/api/resources/user/user.model'

chai.use(chaiHttp)

const createApiSpec = (model, resourceName, newResource) => {
  describe(`/${resourceName}`, () => {
    let jwt

    beforeEach(async () => {
      await dropDb()
      const user = await User.create({username: 'stu1', passwordHash: '123'})
      jwt = signToken(user.id)
    })

    afterEach(async () => {
      await dropDb()
    })

    describe(`GET /${resourceName}`, () => {
      it(`should get all ${resourceName}`, async () => {
        const result = await chai.request(app)
          .get(`/api/${resourceName}`)
          .set('Authorization', `Bearer ${jwt}`)

        expect(result).to.have.status(200)
        expect(result).to.be.json
      })
    })

    describe(`POST /${resourceName}`, () => {
      it(`should create a ${resourceName}`, async () => {
        const result = await chai.request(app)
          .post(`/api/${resourceName}`)
          .set('Authorization', `Bearer ${jwt}`)
          .send(newResource)

        expect(result).to.have.status(201)
        expect(result).to.be.json
      })
    })
  })
}

export default createApiSpec
