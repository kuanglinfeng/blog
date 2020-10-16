import React, { useState } from 'react'
import { Button, Card, Input, message, Spin } from 'antd'
import { KeyOutlined, UserOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import AuthService from 'services/AuthService'

export default () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const history = useHistory()

  const checkLogin = async () => {
    setIsLoading(true)
    if (!username) {
      message.error('用户名不能为空！')
      setTimeout(() => {
        setIsLoading(false)
      }, 500)
      return false
    } else if (!password) {
      message.error('密码不能为空！')
      setTimeout(() => {
        setIsLoading(false)
      }, 500)
      return false
    }
    const result = await AuthService.login({username, password})
    const token = result.data
    if (token) {
      window.localStorage.setItem('token', token)
      history.push('/')
    } else {
      message.error('用户名密码错误！')
      setTimeout(() => {
        setIsLoading(false)
      }, 500)
    }
  }

  const onKeyDown = async (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      await checkLogin()
    }
  }

  return (
    <div className='login-div'>
      <Spin
        tip="Loading..."
        spinning={isLoading}
      >
        <Card
          title='博客后台管理系统'
          bordered={true}
          style={{width: 400, textAlign: 'center'}}
        >
          <Input
            id='username'
            size='large'
            placeholder='输入用户名'
            prefix={<UserOutlined />}
            onChange={e => {
              setUsername(e.target.value)
            }}
          />
          <br/><br/>
          <Input.Password
            id='password'
            size='large'
            placeholder='输入密码'
            prefix={<KeyOutlined />}
            onChange={e => {
              setPassword(e.target.value)
            }}
            // @ts-ignore
            onKeyDown={onKeyDown}
          />
          <br/><br/>
          <Button
            type='primary'
            size='large'
            block
            onClick={checkLogin}
          >
          登录
          </Button>
        </Card>
      </Spin>
    </div>
  )
}