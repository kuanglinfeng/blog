/**
 * 进行响应：服务器的接口响应格式，往往是一种标准格式
 * 这里我们进行约定：
 * 错误：{error: 'xxx', data: null}
 * 正常：{error: '', data: 数据}
 * 分页：{error: '', data: xxx[], total: xxx}
 */
import { Response } from 'express'
import { ISearchResult } from '../types/commonTypes'

export default class ResponseHelper {

  public static sendError(errors: string | string[], response: Response) {
    let errorString: string
    if (Array.isArray(errors)) {
      errorString = errors.join(';')
    } else {
      errorString = errors
    }
    response.send({error: errorString, data: null})
  }

  public static sendData(data: any, response: Response) {
    response.send({error: '', data})
  }

  public static sendPageData<T>(searchResult: ISearchResult<T>, response: Response) {
    if (searchResult.errors.length > 0) {
      this.sendError(searchResult.errors, response)
    } else {
      response.send({error: '', data: searchResult.data, total: searchResult.count})
    }
  }

}