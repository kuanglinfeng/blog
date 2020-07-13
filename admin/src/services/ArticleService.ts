import axios from 'axios'
import { IResponseData, IResponseError, IResponsePageData, ISearchCondition } from './commonTypes'

export interface IArticle {
  _id?: string
  title: string
  tagList: string[]
  publishTime: Date
  content: string
}

export default class ArticleService {

  public static async getArticleById(id: string): Promise<IResponseData<IArticle> | null> {
    const { data } = await axios.get('/api/article/' + id)
    return data
  }

  public static async getArticles(condition: ISearchCondition): Promise<IResponsePageData<IArticle> | null> {
    const { data } = await axios.get('/api/article', {
      params: condition
    })
    return data
  }

  public static async add(article: IArticle): Promise<IResponseData<IArticle> | IResponseError> {
    const { data } = await axios.post('/api/article', article)
    return data
  }

  public static async delete(id: string): Promise<IResponseData<true> | IResponseError> {
    const { data } = await axios.delete('/api/article/' + id)
    return data
  }

  // Partial可让IArticle里的属性变成全部可选
  public static async edit(id: string, article: Partial<IArticle>): Promise<IResponseData<true> | IResponseError> {
    const { data } = await axios.put('/api/article/' + id, article)
    return data
  }
}