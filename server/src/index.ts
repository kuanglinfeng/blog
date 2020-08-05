import 'reflect-metadata'
import Express from 'express'
import articleRoute from './routes/articleRoute'
import clientArticleRoute from './routes/clientArticleRoute'

const app = Express()

app.use(Express.json({limit: '50mb'}))

// 客户端路由
app.use('/', clientArticleRoute)

// 管理端路由
app.use('/api/article', articleRoute)

app.listen(3000, () => console.log('服务已开启！'))