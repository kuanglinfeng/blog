import React, { PropsWithChildren, useEffect, useState } from 'react'
import { Redirect, Route } from 'react-router-dom'
import AuthService from 'services/AuthService'

export default (props: PropsWithChildren<any>) => {
  const { children, ...rest } = props
  const [isAuthenticated, setIsAuthenticated] = useState(true)

  useEffect(() => {
    let didCancel = false;
    (async () => {
      const token = window.localStorage.getItem('token') || ''
      const result = await AuthService.auth(token)
      if (!didCancel) {
        // 在组件销毁以后再执行下面的操作会出现bug
        setIsAuthenticated(Boolean(result.data))
      }
    })()
    return () => {
      didCancel = true
    }
  }, [])

  return (
    <Route
      { ...rest }
      render={ ({ location }) => (
        isAuthenticated ? children : (
          <Redirect
            to={ {
              pathname: '/login',
              state: { from: location }
            } }
          />
        )
      ) }
    />
  )
}
