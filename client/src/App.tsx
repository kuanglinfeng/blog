import React from 'react'
import TopNav from './components/TopNav'
import { Switch, Route } from 'react-router-dom'
import About from './pages/About'
import Home from './pages/Home'
import Tags from './pages/Tags'

function App() {
  return (
    <div className="App">
      <TopNav />
      <Switch>
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
    </div>
  )
}

export default App
