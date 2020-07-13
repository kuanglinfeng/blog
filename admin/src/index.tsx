import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import 'antd/dist/antd.css'
import App from './App'
import ArticleService from 'services/ArticleService'

// ArticleService.getArticles({limit: 10, keyword: '1'}).then(res => console.log(res))

// ArticleService.getArticles({limit: 10, keywordProp: 'tagList', keyword: '算法'}).then(res => console.log(res))


// ArticleService.getArticleById('5f015b4a189c9308a75932aa').then(res => console.log(res))

// ArticleService.edit('5f015b4a189c9308a75932aa', {content: '修改后了的内容29'}).then(res => console.log(res))

// ArticleService.add({title: '标题101', content: '内容101', tagList: ['前端'], publishTime: new Date()}).then(res => console.log(res))

// ArticleService.delete('5f0bbe906b73463be34973d7').then(res => console.log(res))

// for (let i = 0; i < 50; i++) {
//   ArticleService.add({title: `标题${i+1}`, content: `内容${i+1}`, tagList: ['算法'], publishTime: new Date()}).then(res => console.log(res))
// }

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)