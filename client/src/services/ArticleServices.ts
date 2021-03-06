import axios from 'axios'
import { IArticle } from '../types/commonTypes'
import url from '../../src/services/url'

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
    const { data } = await axios.get(url + '/articles')
    return data
  }

  public static async filterArticleById(id: string): Promise<IResponseData<IArticle>> {
    const { data } = await axios.get(url + '/detail/' + id)
    return data
  }

  public static async search(condition: SearchCondition): Promise<IResponseData<IArticle[]>> {
    const { data } = await axios.get(url + '/search', {
      params: condition
    })
    return data
  }

  public static async getArticlesByAllTag() {
    const { data } = await axios.get(url + '/tags')
    return data
  }

  public static async getArticlesByTag(tag: string) {
    const { data } = await axios.get(url + '/tag', {
      params: { tag }
    })
    return data
  }
}
