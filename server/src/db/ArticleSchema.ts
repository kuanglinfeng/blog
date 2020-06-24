import Mongoose from 'mongoose'
import Article from '../model/Article'

export interface IArticle extends Article, Mongoose.Document {}

const articleMovie = new Mongoose.Schema<IArticle>({
  // 运行时的类型
  title: String,
  tagList: [String],
  publishTime: Date,
  content: String
}, { versionKey: false })

export default Mongoose.model<IArticle>('Article', articleMovie)