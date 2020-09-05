
// 客户端的请求接口，请求所有文章
import ClientArticleService, { ClientSearchCondition, TagsQuery } from '../services/ClientArticleService'
import ResponseHelper from './ResponseHelper'
import Express, { response } from 'express'

const router = Express.Router()

router.get('/articles', async (request, response) => {
  try {
    const articles = await ClientArticleService.getArticles()
    ResponseHelper.sendData(articles, response)
  } catch (e) {
    ResponseHelper.sendData(null, response)
  }
})

router.get('/detail/:id', async (request, response) => {
  try {
    const id: string = request.params.id
    const article = await ClientArticleService.filterArticleById(id)
    ResponseHelper.sendData(article, response)
  } catch (e) {
    ResponseHelper.sendData(null, response)
  }
})

// 根据标题或者标签查询多篇文章 这里用query
router.get('/search', async (request, response) => {
  const result = await ClientArticleService.search(request.query as ClientSearchCondition)
  ResponseHelper.sendData(result, response)
})

router.get('/tags', async (request, response) => {
  try {
    const articles = await ClientArticleService.getArticlesByAllTags()
    ResponseHelper.sendData(articles, response)
  } catch (e) {
    ResponseHelper.sendData(null, response)
  }
})

// 考虑到tag有可能为中文，所以还是使用query，查询形式:/tag?tag=标签名
router.get('/tag', async (request, response) => {
  try {
    const articles = await ClientArticleService.getArticlesByTag(request.query as TagsQuery)
    ResponseHelper.sendData(articles, response)
  } catch (e) {
    ResponseHelper.sendData(null, response)
  }
})


export default router