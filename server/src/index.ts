import 'reflect-metadata'
import Express  from 'express'
import cors from 'cors'
import articleRoute from './routes/articleRoute'
import clientArticleRoute from './routes/clientArticleRoute'
import uploadRouter from './routes/uploadRoute'

const app = Express()

const allowList = [
  'https://www.kuanglinfeng.com',
  'https://kuanglinfeng.com',
  'http://blogsys.kuanglinfeng.com',
  'https://blog.kuanglinfeng.com'
]
const corsOptionsDelegate = function (req: any, callback: any) {
  let corsOptions;
  if (allowList.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}

// 跨域
app.use(cors(corsOptionsDelegate))

// 访问上传的静态文件
app.use('/upload', Express.static('public/upload'))

app.use(Express.json({limit: '50mb'}))

// 客户端路由
app.use('/', clientArticleRoute)

// 管理端路由
app.use('/api/article', articleRoute)

// 文件上传
// 通常情况下，服务器会提供一个统一的aip接口，用于处理上传的文件
app.use('/api/upload', uploadRouter)

app.listen(5500, () => console.log(`http://localhost:5500`))