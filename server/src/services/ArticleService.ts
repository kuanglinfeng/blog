import Article from '../model/Article'
import { IArticle } from '../db/ArticleSchema'
import { ArticleModel } from '../db'
import SearchCondition from '../model/SearchCondition'
import { ISearchResult } from '../types/commonTypes'

export default class {
  /**
   * 添加一篇文章
   * @param article
   * @return IArticle | string[] 添加成功返回文章对象，失败返回一个字符串数组，记录着错误信息
   */
  public static async add(article: Article): Promise<IArticle | string[]> {
    article = Article.transform(article)
    const errors = await article.validateThis()
    if (errors.length > 0) {
      return errors
    }
    return await ArticleModel.create(article)
  }

  public static async remove(id: string): Promise<void> {
    await ArticleModel.deleteOne({_id: id})
  }

  /**
   * 修改电影信息
   * @param id 要修改的电影的id
   * @param article 替换的值
   * @return string[] 错误信息数组
   */
  public static async edit(id: string, article: Article): Promise<string[]> {
    const newArticle = Article.transform(article)
    // 数据验证，跳过那些没有填写的属性
    const errors = await newArticle.validateThis(true)
    if (errors.length > 0) {
      return errors
    }
    await ArticleModel.update({_id: id}, article)
    return []
  }

  public static async findById(id: string): Promise<IArticle | null> {
    return ArticleModel.findById(id)
  }

  public static async find(searchCondition: SearchCondition | object): Promise<ISearchResult<IArticle>>{
    const newSearchCondition = SearchCondition.transform(searchCondition)
    const errors = await newSearchCondition.validateThis(true)
    if (errors.length > 0) {
      return {count: 0, data: [], errors}
    }
    let articles: IArticle[] = []
    let count: number = 0
    // 忽视大小写
    const reg = new RegExp(newSearchCondition.keyword, 'i')
    if (newSearchCondition.keywordProp === 'title') {
      articles = await ArticleModel.find({
        title: {$regex: reg}
      }).sort({publishTime: -1}).skip((newSearchCondition.page - 1) * newSearchCondition.limit).limit(newSearchCondition.limit)

      count = await ArticleModel.find({
        title: {$regex: reg}
      }).countDocuments()
    } else {
      articles = await ArticleModel.find({
        tagList: {"$in": [reg]}
      }).sort({publishTime: -1}).skip((newSearchCondition.page - 1) * newSearchCondition.limit).limit(newSearchCondition.limit)

      count = await ArticleModel.find({
        tagList: {"$in": [reg]}
      }).countDocuments()
    }

    return {count, data: articles, errors: []}
  }

}