import React from 'react'
import Layout from 'pages/Layout'
import {BrowserRouter, Route} from 'react-router-dom'
import {ConfigProvider} from 'antd'
import zhCN from 'antd/es/locale/zh_CN';

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <BrowserRouter>
        <Route path='/' component={Layout} />
      </BrowserRouter>
    </ConfigProvider>

  )
}

export default App
