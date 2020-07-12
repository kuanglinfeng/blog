import React from 'react'
import { Layout, Menu } from 'antd'
import { NavLink, Route } from 'react-router-dom'
import ArticleList from 'pages/article/ArticleList'
import AddArticle from 'pages/article/AddArticle'
import EditArticle from 'pages/article/EditArticle'

const { Header, Sider, Content } = Layout


const _Layout: React.FC = () => {
  return (
    <div className='container'>
      <Layout>
        <Header className='header'>
          <NavLink to='/' >个人博客后台管理系统</NavLink>
        </Header>
        <Layout>
          <Sider>
            <Menu
              mode="inline"
              theme="dark"
            >
              <Menu.Item key="1">
                <NavLink to='/article'>文章列表</NavLink>
              </Menu.Item>
              <Menu.Item key="2">
                <NavLink to='/article/add'>添加文章</NavLink>
              </Menu.Item>
            </Menu>
          </Sider>
          <Content>
            <div className="main">
              <Route path='/' component={ArticleList} exact />
              <Route path='/article' component={ArticleList} exact />
              <Route path='/article/add' component={AddArticle} exact />
              <Route path='/article/add/:id' component={EditArticle} exact />
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  )
}

export default _Layout