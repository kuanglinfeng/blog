import { ArticleActionTypeEnums, IAction } from './ActionTypes'
import { IArticle } from '../../services/ArticleService'
import { ISearchCondition } from '../../services/commonTypes'

export type SaveArticleAction = IAction<ArticleActionTypeEnums.Save, {
  articles: IArticle[], total: number
}>

export type SetLoadingAction = IAction<ArticleActionTypeEnums.SetLoading, boolean>

export type SetSearchConditionAction = IAction<ArticleActionTypeEnums.SetSearchCondition, ISearchCondition>

export type DeleteArticleAction = IAction<ArticleActionTypeEnums.Delete, string>

export type ArticleActions = SaveArticleAction | SetLoadingAction | SetSearchConditionAction | DeleteArticleAction | {type: 'authSuccess'}