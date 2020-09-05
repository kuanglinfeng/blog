import React, { createContext, useEffect, useReducer } from 'react'
import TopNav from './components/topnav/TopNav'
import { Switch, Route } from 'react-router-dom'
import styled from 'styled-components'
import About from './pages/About'
import Home from './pages/Home'
import Tags from './pages/Tags'
import Detail from './pages/Detail'
import articleReducer, { articleInitialState, IArticleContextValue } from './redux/articleReducer'
import ArticleServices from './services/ArticleServices'
import Tag from './pages/Tag'

const Main = styled.main`
  max-width: 960px;
  margin: 10px auto 0;
  overflow-x: hidden;
`

export const IArticleContext = createContext<IArticleContextValue | undefined>(undefined)

function App() {

  // @ts-ignore
  const [state, dispatch] = useReducer(articleReducer, articleInitialState)

  useEffect(() => {
    (async () => {
      const result = await ArticleServices.getArticles()
      if (!result.error) {
        dispatch({type: 'getArticles', payload: {articles: result.data}})
      }
      // 服务器异常，数据没有获取到，跳转到404页面
    })()
  }, [])

  return (
    <IArticleContext.Provider value={ { state, dispatch } }>
      <div className="App">
        <TopNav />
        <Main>
          <Switch>
            <Route path="/detail/:id">
              <Detail />
            </Route>
            <Route path="/tag">
              <Tag />
            </Route>
            <Route path="/tags">
              <Tags />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Main>
      </div>
    </IArticleContext.Provider>
  )
}

export default App
