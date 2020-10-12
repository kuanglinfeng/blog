import 'reflect-metadata'
import Express from 'express'
import articleRoute from './routes/articleRoute'
import clientArticleRoute from './routes/clientArticleRoute'
import uploadRouter from './routes/uploadRoute'

const app = Express()

app.use('/upload', Express.static('public/upload'))

app.use(Express.json({limit: '50mb'}))

// 客户端路由
app.use('/', clientArticleRoute)

// 管理端路由
app.use('/api/article', articleRoute)

// 文件上传
// 通常情况下，服务器会提供一个统一的aip接口，用于处理上传的文件
app.use('/api/upload', uploadRouter)

app.listen(3000, () => console.log('服务已开启！'))