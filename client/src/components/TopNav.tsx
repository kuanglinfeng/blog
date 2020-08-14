import React, { useState } from 'react'
import styled  from 'styled-components'
import logo from '../assets/logo.png'
import menu from '../assets/menu.png'
import Search from './Search'
import { NavLink as Link } from 'react-router-dom'
import SearchWindow from './SearchWindow'

const TopNav = styled.nav`
  background: #fff;
`

const TopNavCenter = styled.div`
  height: 70px;
  display:flex;
  align-items: center;
  padding: 8px 0;
  max-width: 1100px;
  margin: 0 auto;
  background: #fff;
  border-bottom: 1px solid #eee;
  @media (max-width: 740px) {
    position: relative;
    justify-content: center;
  }
`

const MenuButton = styled.div`
  @media (max-width: 740px) {
    position: absolute;
    width: 24px;  height: 24px;
    top: 22px; left: 12px;
    cursor: pointer;
    background: url(${ menu }) center center no-repeat;
    background-size: 24px;
  }
`

const AsideNav = styled.ul`
  list-style: none;
  display: none;
  @media (max-width: 740px) {
    display:block;
    position: absolute;
    top: 50px; left: 0;
    background: #eee;
    padding: 10px 10px 10px 20px;
    width: 100%;
  }
`

const AsideNavItem = styled.li`
  @media (max-width: 740px) {
    margin-top: 0.5em;
    line-height: 1.5em;
    padding-left: 1em;
  }
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
    @media (max-width: 740px) {
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

const Tip = styled.span`
  position: absolute;
  top: 22px; left: 42px;
  white-space: nowrap;
  display: inline-block;
  padding-left: 6px;
  font-size: 12px;
  color: #4f5959;
  margin-right: auto;
  @media (max-width: 740px) {
    display: none;
  }
`

const Menu = styled.ul`
  list-style: none;
  display:flex;
  align-items: center;
  white-space: nowrap;
  flex-wrap: nowrap;
  height: 30px;
  @media (max-width: 740px) {
    display: none;
  }
`

const MenuItem = styled.li`
  margin: 0 1em;
  &:hover {
    color: #34ADB5;
    cursor: pointer;
  }
`

export default function () {

  const [asideVisible, setAsideVisible] = useState<boolean>(false)
  const [searchWindowVisible, setSearchWindowVisible] = useState<boolean>(false)
  const [keyword, setKeyword] = useState<string>('')

  const handleMenuButtonClick = () => {
    setAsideVisible(!asideVisible)
  }

  const handleSearchInputSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      setSearchWindowVisible(true)
    }
  }

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }

  const onSearchWindowClose = () => {
    setSearchWindowVisible(false)
  }

  const handleSearchWindowChange = (value: string) => {
    setKeyword(value)
  }

  return (
    <TopNav>
      <SearchWindow
        visible={searchWindowVisible}
        onClose={onSearchWindowClose}
        value={keyword}
        onChange={handleSearchWindowChange}
      />
      <TopNavCenter>
        <MenuButton onClick={ handleMenuButtonClick } />
        {
          asideVisible ? (<AsideNav>
            <AsideNavItem>
              <Link to='/'>首页</Link>
            </AsideNavItem>
            <AsideNavItem>
              <Link to='/tags'>标签</Link>
            </AsideNavItem>
            <AsideNavItem>
              <Link to='/about'>关于</Link>
            </AsideNavItem>
          </AsideNav>) : null
        }
        <TipWrapper>
          <a href='/'>
            <Logo src={ logo } />
          </a>
          <Tip>匡琳锋的个人博客</Tip>
        </TipWrapper>
        <Search onSubmit={handleSearchInputSubmit} onChange={handleSearchInputChange} value={keyword}/>
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
      </TopNavCenter>
    </TopNav>
  )
}
