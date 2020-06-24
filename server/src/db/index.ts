import Mongoose from 'mongoose'
import ArticleModel from './ArticleSchema'

Mongoose.connect('mongodb://localhost:27017/blogdb', {
  useNewUrlParser: true
}).then(() => console.log('连接数据库成功'))

export { ArticleModel }