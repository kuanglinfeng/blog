import Mongoose from 'mongoose'
import ArticleModel from './ArticleSchema'

Mongoose.connect('mongodb://localhost:27017/blog', {
  useNewUrlParser: true
}).then(() => console.log('连接数据库成功'))

export { ArticleModel }