import { IArticle } from '../db/ArticleSchema'
import { ArticleModel } from '../db'

export type ClientSearchCondition = {
  keywordProp: 'title' | 'tag'
  keyword: string
}

export type TagsQuery = {
  tag: string
}

export default class {

  public static async getArticles(): Promise<IArticle[] | null> {
    return ArticleModel.find({}).sort({ publishTime: -1 })
  }

  public static async filterArticleById(id: string): Promise<IArticle | null> {
    return ArticleModel.findById(id)
  }

  public static async filterArticlesByTitle(title: string): Promise<IArticle[] | null> {
    // 忽视大小写
    const reg = new RegExp(title, 'i')
    return ArticleModel.find({
      title: { $regex: reg }
    })
  }

  public static async filterArticlesByTag(tag: string): Promise<IArticle[] | null> {
    // 忽视大小写
    const reg = new RegExp(tag, 'i')
    return ArticleModel.find({
      tagList: { '$in': [reg] }
    })
  }

  public static async search(condition: ClientSearchCondition) {
    if (condition.keywordProp === 'title') {
      return this.filterArticlesByTitle(condition.keyword)
    }
    if (condition.keywordProp === 'tag') {
      return this.filterArticlesByTag(condition.keyword)
    }
  }

  // 获取所有标签
  public static async getAllTags(): Promise<string[] | null> {
    const articles = await this.getArticles()
    const tags: string[] = []
    articles && articles.forEach(article => {
      article.tagList.forEach(tag => {
        if (tags.indexOf(tag) === -1) {
          tags.push(tag)
        }
      })
    })
    return tags.length === 0 ? null : tags
  }

  // 获取某一标签下的所有文章
  public static async getArticlesByTag(tagsQuery: TagsQuery): Promise<IArticle[] | null> {
    const articles = await this.getArticles()
    if (articles === null)  return null
    return articles.filter(article => article.tagList.indexOf(tagsQuery.tag) !== -1)
  }
}