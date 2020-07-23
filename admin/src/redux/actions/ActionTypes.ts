export enum ArticleActionTypeEnums {
  'Save',
  'SetLoading',
  'SetSearchCondition',
  'Delete'
}

export interface IAction<T, P> {
  type: T
  payload: P
}

