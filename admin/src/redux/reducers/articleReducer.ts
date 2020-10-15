import { IArticle } from '../../services/ArticleService'
import { ISearchCondition } from '../../services/commonTypes'
import {
  ArticleActions,
  DeleteArticleAction,
  SaveArticleAction,
  SetLoadingAction,
  SetSearchConditionAction
} from '../actions/ArticleActions'
import { ArticleActionTypeEnums } from '../actions/ActionTypes'

// 让ISearchCondition接口里的类型都变为必填的
export type IArticleCondition = Required<ISearchCondition>

export interface IArticleState {
  isAuthenticated: boolean,
  data: IArticle[]
  searchCondition: IArticleCondition
  total: number
  totalPage: number
  isLoading: boolean
}

export const initialState: IArticleState = {
  isAuthenticated: false,
  data: [],
  searchCondition: {
    page: 1,
    limit: 10,
    keywordProp: 'title',
    keyword: ''
  },
  total: 0,
  isLoading: false,
  totalPage: 0
}

function authSuccess(state: IArticleState) {
  return {
    ...state,
    authenticate: true
  }
}

function saveArticle(state: IArticleState, action: SaveArticleAction): IArticleState {
  return {
    ...state,
    data: action.payload.articles,
    total: action.payload.total,
    totalPage: Math.ceil(action.payload.total / state.searchCondition.limit)
  }
}

function setLoading(state: IArticleState, action: SetLoadingAction): IArticleState {
  return {
    ...state,
    isLoading: action.payload
  }
}

function setSearchCondition(state: IArticleState, action: SetSearchConditionAction): IArticleState {
  const newState: IArticleState = {
    ...state,
    searchCondition: {
      ...state.searchCondition,
      ...action.payload
    }
  }
  newState.totalPage = Math.ceil(newState.total / newState.searchCondition.limit)
  return newState
}

function deleteArticle(state: IArticleState, action: DeleteArticleAction): IArticleState {
  return {
    ...state,
    data: state.data.filter(article => article._id !== action.payload),
    total: state.total - 1,
    totalPage: Math.ceil((state.total - 1) / state.searchCondition.limit)
  }
}

export default (state: IArticleState = initialState, action: ArticleActions): IArticleState => {
  if (action.type === 'authSuccess') {
    return authSuccess(state)
  }
  if (action.type === ArticleActionTypeEnums.Save) {
    return saveArticle(state, action)
  }
  if (action.type === ArticleActionTypeEnums.SetLoading) {
    return setLoading(state, action)
  }
  if (action.type === ArticleActionTypeEnums.SetSearchCondition) {
    return setSearchCondition(state, action)
  }
  if (action.type === ArticleActionTypeEnums.Delete) {
    return deleteArticle(state, action)
  }
  return state
}