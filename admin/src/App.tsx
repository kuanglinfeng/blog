import React, { createContext, Dispatch, useReducer } from 'react'
import Home from 'pages/Home'
import { BrowserRouter, Route } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import articleReducer, { IArticleState, initialState } from './redux/reducers/articleReducer'
import { ArticleActions } from './redux/actions/ArticleActions'

export interface IContextValue {
  state: IArticleState
  dispatch: Dispatch<ArticleActions>
}

export const Context = createContext<IContextValue | undefined>(undefined)

function App() {

  const [state, dispatch] = useReducer(articleReducer, initialState)

  return (
    <ConfigProvider locale={ zhCN }>
      <Context.Provider value={ { state, dispatch } }>
        <BrowserRouter>
          <Route path='/' component={ Home } />
        </BrowserRouter>
      </Context.Provider>
    </ConfigProvider>
  )
}

export default App
