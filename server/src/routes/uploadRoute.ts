import Express from 'express'
import multer from 'multer'
import path from 'path'
import ResponseHelper from '../routes/ResponseHelper'
import fs from 'fs'

const router = Express.Router()

const uploadDir = path.resolve(__dirname, '../../public/upload')

// 文件保存的配置
const storage = multer.diskStorage({
  destination: uploadDir,
  filename: function (request, file, callback) {
    // 文件名
    const time = new Date().getTime()
    // 后缀名
    const extName = path.extname(file.originalname)
    callback(null, `${ time }${ extName }`)
  }
})
const allowExtensions = ['.jpeg', '.jpg', '.png', '.gif']
const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 10 // 最多10M
  },
  fileFilter(request, file, callback) {
    const extName = path.extname(file.originalname)
    if (allowExtensions.includes(extName)) {
      callback(null, true)
    } else {
      callback(new Error('文件类型不正确'))
    }
  }
}).single('imageFile')

router.post('/', (request, response) => {
  upload(request, response, (error: any) => {
    if (error) {
      ResponseHelper.sendError(error.message as string, response)
    } else {
      const url = `/upload/${ request.file.filename }`
      ResponseHelper.sendData(url, response)
    }
  })
})

// 获取上传的所有文件
router.get('/', (request, response) => {
  const files = fs.readdirSync(uploadDir)
  ResponseHelper.sendData(files, response)
})

// 删除某个文件
router.delete('/:id', (request, response) => {
  fs.unlink(`${ uploadDir }/${ request.params.id }`, (err) => {
    if (err) {
      ResponseHelper.sendError('文件名错误', response)
    } else {
      ResponseHelper.sendData(true, response)
    }
  })
})
export default router