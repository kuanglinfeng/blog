import 'reflect-metadata'
import Express  from 'express'
import cors from 'cors'
import articleRoute from './routes/articleRoute'
import clientArticleRoute from './routes/clientArticleRoute'
import uploadRoute from './routes/uploadRoute'
import loginRoute from './routes/loginRoute'
import authRoute from './routes/authRoute'

const app = Express()

const allowList = [
  'http://localhost:3000',
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
// 用户登录接口，登录成功返回token给用户，需要用户传账号和密码到request.body带给服务器
app.use('/api/login', loginRoute)
// 用户鉴权接口，鉴权成功返回true，需要用户传token到请求头request.headers：Authorization: Bearer token值
app.use('/api/auth', authRoute)
// 用户操作文章的接口
app.use('/api/article', articleRoute)

// 文件上传
// 通常情况下，服务器会提供一个统一的aip接口，用于处理上传的文件
app.use('/api/upload', uploadRoute)

app.listen(5500, () => console.log(`http://localhost:5500`))