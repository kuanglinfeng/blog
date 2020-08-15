import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { BrowserRouter as Router, } from 'react-router-dom'
// import ArticleServices from './services/ArticleServices'
//
// ArticleServices.search({keywordProp: 'tag', keyword: 'typescript'}).then(result => {
//   console.log(result)
// })

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)


