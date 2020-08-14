import axios from 'axios'
import { IArticle } from '../types/commonTypes'

export interface IResponseData<T> {
  data: T
  error: string
}

type SearchCondition = {
  keywordProp: 'title' | 'tag'
  keyword: string
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

  public static async search(condition: SearchCondition): Promise<IResponseData<IArticle[]>> {
    const {data} = await axios.get('/search', {
      params: condition
    })
    return data
  }

}
