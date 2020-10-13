import axios from 'axios'
import { IResponseData, IResponseError, IResponsePageData, ISearchCondition } from './commonTypes'
import url from 'services/url'

export interface IArticle {
  _id?: string
  title: string
  tagList: string[]
  publishTime: Date
  content: string
}

export default class ArticleService {

  public static async getArticleById(id: string): Promise<IResponseData<IArticle> | null> {
    const { data } = await axios.get(url +'/api/article/' + id)
    return data
  }

  public static async getArticles(condition: ISearchCondition): Promise<IResponsePageData<IArticle>> {
    const { data } = await axios.get(url +'/api/article', {
      params: condition
    })
    return data
  }

  public static async add(article: IArticle): Promise<IResponseData<IArticle> | IResponseError> {
    const { data } = await axios.post(url + '/api/article', article)
    return data
  }

  public static async delete(id: string): Promise<IResponseData<true> | IResponseError> {
    const { data } = await axios.delete(url + '/api/article/' + id)
    return data
  }

  // Partial可让IArticle里的属性变成全部可选
  public static async edit(id: string, article: Partial<IArticle>): Promise<IResponseData<true> | IResponseError> {
    const { data } = await axios.put(url + '/api/article/' + id, article)
    return data
  }
}