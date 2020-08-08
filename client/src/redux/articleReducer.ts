import { IArticle } from '../types/commonTypes'
import { Dispatch } from 'react'

interface IArticleState {
  articles: IArticle[]
  filteredArticles: IArticle[]
}

export const articleInitialState: IArticleState = {
  articles: [],
  filteredArticles: []
}

type ArticlePayload = {
  articles?: IArticle[]
  filter?: string
}

type IArticleAction = {
  type: 'getArticles' | 'filterArticleById' | 'filterArticlesByTitle' | 'filterArticlesByTag'
  payload: ArticlePayload
}

export interface IArticleContextValue {
  state: IArticleState
  dispatch: Dispatch<IArticleAction>
}

function articleReducer(state: IArticleState = articleInitialState, action: IArticleAction) {
  if (action.type === 'getArticles') {
    return {...state, articles: [...action.payload.articles!]}
  }
  if (action.type === 'filterArticleById') {
    const id = action.payload.filter
    const article = state.articles.find((article => article._id === id))
    return {...state, filteredArticles: [article]}
  }
  if (action.type === 'filterArticlesByTitle') {
    if (state.articles.length === 0) return state

  }
  if (action.type === 'filterArticlesByTag') {

  }

  return state
}

export default articleReducer