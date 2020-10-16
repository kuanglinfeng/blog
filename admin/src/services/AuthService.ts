import axios from 'axios'
import url from 'services/url'
import { IResponseData, IResponseError } from 'services/commonTypes'

export type User = {
  username: string
  password: string
}

export default class AuthService {
  public static async login(user: User): Promise<IResponseData<string> | IResponseError> {
    const { data } = await axios.post(url + '/api/login', user)
    return data
  }

  public static async auth(token: string): Promise<IResponseData<boolean> | IResponseError> {
    const { data } = await axios.get(url + '/api/auth', {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
    return data
  }
}