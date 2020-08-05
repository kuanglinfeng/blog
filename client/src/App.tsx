import React from 'react'
import TopNav from './components/TopNav'
import { Switch, Route } from 'react-router-dom'
import styled from 'styled-components'
import About from './pages/About'
import Home from './pages/Home'
import Tags from './pages/Tags'
import Detail from './pages/Detail'

const Main = styled.main`
  max-width: 960px;
  margin: 10px auto 0;
`

function App() {
  return (
    <div className="App">
      <TopNav />
      <Main>
        <Switch>
          <Route path="/detail/:id">
            <Detail />
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
  )
}

export default App
