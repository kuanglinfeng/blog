
// 客户端获取文章
// 1. 进入首页获取所有文章，渲染列表
// 2. 首页搜索文章时，根据关键字重新请求文章，重新渲染列表（也可以不请求，第1步拿到的数据可以放到redux里，这里在redux进行筛选）
// 3. 根据选中的标签，重新请求文章，渲染列表（也可以不请求，第1步拿到的数据可以放到redux里，这里在redux进行筛选）

import { IArticle } from '../db/ArticleSchema'
import { ArticleModel } from '../db'

export default class {

  public static async getArticles(): Promise<IArticle[] | null> {
    return ArticleModel.find({}).sort({publishTime: -1})
  }
}