import axios from 'axios'
import { IArticle } from '../types/commonTypes'

export interface IResponseData<T> {
  data: T
  error: string
}

export default class {
  public static async getArticles(): Promise<IResponseData<IArticle[]>> {
    const {data} = await axios.get('/articles')
    return data
  }

  public static async filterArticleById(id: string): Promise<IResponseData<IArticle>> {
    const {data} = await axios.get('/detail/' + id)
    return data
  }
}
