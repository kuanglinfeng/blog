import React from 'react'
import { Button, Layout, Menu } from 'antd'
import { NavLink, Redirect, Route, Switch, useHistory } from 'react-router-dom'
import ArticleList from 'pages/article/ArticleList'
import AddArticle from 'pages/article/AddArticle'
import EditArticle from 'pages/article/EditArticle'
import UploadImage from 'pages/article/UploadImage'
import PrivateRoute from 'components/PrivateRoute'

const { Header, Sider, Content } = Layout

const Home: React.FC = () => {

  const history = useHistory()

  const logout = () => {
    window.localStorage.removeItem('token')
    history.push('/')
  }

  return (
    <div className='container'>
      <Layout>
        <Header className='header'>
          <NavLink to='/article' >个人博客后台管理系统</NavLink>
          <Button onClick={logout}>注销</Button>
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
              <Menu.Item key="3">
                <NavLink to='/article/image'>上传图片</NavLink>
              </Menu.Item>
            </Menu>
          </Sider>
          <Content>
            <div className="main">
              <Switch>
                <PrivateRoute path='/article/edit/:id'>
                  <EditArticle />
                </PrivateRoute>
                <PrivateRoute path='/article/add'>
                  <AddArticle />
                </PrivateRoute>
                <PrivateRoute path='/article/image'>
                  <UploadImage />
                </PrivateRoute>
                <PrivateRoute path='/article'>
                  <ArticleList />
                </PrivateRoute>
                <Route path='/' render={() => <Redirect to='/article' />} />
              </Switch>
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  )
}

export default Home