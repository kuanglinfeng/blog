import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'
import { UserModel } from '../db'
import PrivateKey from '../services/PrivateKey'
import { User } from '../db/UserSchema'

export interface EnhanceRequest extends Request {
  user: User | null
}

const auth = async (request: EnhanceRequest, response: Response, next: NextFunction) => {
  const token = String(request.headers.authorization).split(' ').pop()!
  try {
    // 用token和秘钥进行解密 得到用户的id
    const decoded = jwt.verify(token, PrivateKey) as { id: string }
    request.user = await UserModel.findById(decoded.id)
  } catch(err) {
    request.user = null
  }
  next()
}

export default auth