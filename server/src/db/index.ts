import Mongoose from 'mongoose'
import ArticleModel from './ArticleSchema'
import UserModel from './UserSchema'

Mongoose.connect('mongodb://localhost:27017/blog', {
  useNewUrlParser: true,
  useCreateIndex: true
}).then(() => console.log('连接数据库成功'))

export { ArticleModel, UserModel }