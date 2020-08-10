
// 客户端的请求接口，请求所有文章
import ClientArticleService from '../services/ClientArticleService'
import ResponseHelper from './ResponseHelper'
import Express from 'express'
import ArticleService from '../services/ArticleService'

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
  // @ts-ignore
  const result = await ClientArticleService.search(request.query)
  ResponseHelper.sendData(result, response)
})


export default router