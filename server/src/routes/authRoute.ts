import Express from 'express'
import auth, { EnhanceRequest } from '../middleware/auth'
import ResponseHelper from '../routes/ResponseHelper'

const router = Express.Router()

// @ts-ignore
router.get('/', auth, async (request: EnhanceRequest, response) => {
  if (request.user) {
    ResponseHelper.sendData(true, response)
  } else {
    ResponseHelper.sendError('验证失败', response)
  }
})

export default router