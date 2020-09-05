import Express from 'express'
import ArticleService from '../services/ArticleService'
import ResponseHelper from './ResponseHelper'

const router = Express.Router()


// 根据id获取单篇文章，详情页使用，这里用params
router.get('/:id', async (request, response) => {
  try {
    const id: string = request.params.id
    const article = await ArticleService.findById(id)
    ResponseHelper.sendData(article, response)
  } catch (e) {
    ResponseHelper.sendData(null, response)
  }
})

// 根据分页信息查询多篇文章 这里用query
router.get('/', async (request, response) => {
  const result = await ArticleService.find(request.query)
  ResponseHelper.sendPageData(result, response)
})

// 添加文章
router.post('/', async (request, response) => {
  // 这里的使用request.body需要使用中间件Express.json()
  const result = await ArticleService.add(request.body)
  if (Array.isArray(result)) {
    ResponseHelper.sendError(result, response)
  } else {
    ResponseHelper.sendData(result, response)
  }
})

// 修改文章
router.put('/:id', async (request, response) => {
  try {
    const result = await ArticleService.edit(request.params.id, request.body)
    if (result.length > 0) {
      ResponseHelper.sendError(result, response)
    } else {
      ResponseHelper.sendData(true, response)
    }
  } catch (e) {
    ResponseHelper.sendError('id错误', response)
  }
})

// 删除文章
router.delete('/:id', async (request, response) => {
  try {
    await ArticleService.remove(request.params.id)
    ResponseHelper.sendData(true, response)
  } catch (e) {
    ResponseHelper.sendError('id错误', response)
  }
})

export default router