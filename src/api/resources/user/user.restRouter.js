import express from 'express'
import userController from './user.controller'

export const userRouter = express.Router()

userRouter.param('id', userController.findByParam)

userRouter.route('/')
  .get(userController.getAll)
  .post(userController.createOne)

userRouter.route('/:id')
  .get(userController.getOne)
  .put(userController.updateOne)
  .delete(userController.deleteOne)
