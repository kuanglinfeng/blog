import Mongoose from 'mongoose'
import Article from '../model/Article'

// Mongoose.Document有一些数据库的操作方法
export interface IArticle extends Article, Mongoose.Document {}

// 泛型IArticle，帮助进行编译时的类型推断
const articleSchema = new Mongoose.Schema<IArticle>({
  // 运行时的类型
  title: String,
  tagList: [String],
  publishTime: Date,
  content: String
}, { versionKey: false })

// 泛型IArticle，帮助进行编译时的类型推断
export default Mongoose.model<IArticle>('Article', articleSchema)