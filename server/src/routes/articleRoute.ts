import Express from 'express'

const router = Express.Router()

// 根据id获取单篇文章，详情页使用，这里用params
router.get('/:id', async (request, response) => {

  response.end(request.params.id)
})

// 根据分页信息查询多篇文章 这里用query
router.get('/', async (request, response) => {
  response.end('根据分页信息获取所有文章')
})

// 添加文章
router.post('/', async (request, response) => {
  response.end('添加文章')
})

// 修改文章
router.put('/', async (request, response) => {
  response.end('修改文章')
})

// 删除文章
router.delete('/:id', async (request, response) => {
  response.end('根据文章id删除文章')
})

export default router