import axios from 'axios'
import { IArticle } from '../types/commonTypes'

interface IResponseData {
  data: IArticle[]
  error: string
}

export default class {
  public static async getArticles(): Promise<IResponseData> {
    const {data} = await axios.get('/articles')
    return data
  }
}
