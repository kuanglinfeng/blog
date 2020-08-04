import React from 'react'
import styled from 'styled-components'
import logo from '../assets/logo.png'
import Search from './Search'
import { NavLink as Link } from 'react-router-dom'

const TopNav = styled.div`
  height: 70px;
  display:flex;
  align-items: center;
  padding: 8px 100px;
  background: #fff;
  border-bottom: 1px solid #eee;
`

const Logo = styled.img`
  width: 50px;
  max-width: 6em;
  &:hover {
    cursor: pointer;
  }
`

const TipWrapper = styled.div`
  position: relative;
  margin-right: auto;
`

const Tip = styled.span`
  position: absolute;
  top: 22px; left: 42px;
  white-space: nowrap;
  display: inline-block;
  padding-left: 6px;
  font-size: 12px;
  color: #999;
  margin-right: auto;
`

const Menu = styled.ul`
  display:flex;
  align-items: center;
  white-space: nowrap;
  flex-wrap: nowrap;
  height: 30px;
`

const MenuItem = styled.li`
  margin: 0 1em;
  &:hover {
    color: #34ADB5;
    cursor: pointer;
  }
`

export default function() {

  return (
    <TopNav>
      <TipWrapper>
        <Logo src={logo} />
        <Tip>匡琳锋的个人博客</Tip>
      </TipWrapper>
      <Search />
      <Menu>
        <MenuItem>
          <Link to='/'>首页</Link>
        </MenuItem>
        <MenuItem>
          <Link to='/tags'>标签</Link>
        </MenuItem>
        <MenuItem>
          <Link to='/about'>关于</Link>
        </MenuItem>
      </Menu>
    </TopNav>
  )
}
