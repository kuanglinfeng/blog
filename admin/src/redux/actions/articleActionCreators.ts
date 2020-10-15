import { IArticle } from '../../services/ArticleService'
import { DeleteArticleAction, SaveArticleAction, SetLoadingAction, SetSearchConditionAction } from './ArticleActions'
import { ArticleActionTypeEnums } from './ActionTypes'
import { ISearchCondition } from '../../services/commonTypes'

export const createAuthenticate = () => ({
  type: 'authSuccess'
})

export const createSaveArticleAction = (articles: IArticle[], total: number): SaveArticleAction => ({
  type: ArticleActionTypeEnums.Save,
  payload: { articles, total }
})

export const createSetLoadingAction = (isLoading: boolean): SetLoadingAction => ({
  type: ArticleActionTypeEnums.SetLoading,
  payload: isLoading
})

export const createSetSearchConditionAction = (searchCondition: ISearchCondition): SetSearchConditionAction => ({
  type: ArticleActionTypeEnums.SetSearchCondition,
  payload: searchCondition
})

export const createDeleteArticleAction = (id: string): DeleteArticleAction => ({
  type: ArticleActionTypeEnums.Delete,
  payload: id
})