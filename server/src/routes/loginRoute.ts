import Express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { UserModel } from '../db/'
import ResponseHelper from '../routes/ResponseHelper'
import PrivateKey from '../services/PrivateKey'

const router = Express.Router()

router.post('/', async (request, response) => {
  const user = await UserModel.findOne({
    username: request.body.username
  })
  if (!user) {
    return ResponseHelper.sendError('用户不存在', response)
  }
  const isPasswordValid = bcrypt.compareSync(
    request.body.password,
    user.password
  )
  if (!isPasswordValid) {
    return ResponseHelper.sendError('密码错误', response)
  }
  const token = jwt.sign({
    id: String(user._id)
  }, PrivateKey)
  ResponseHelper.sendData(token, response)
})

export default router