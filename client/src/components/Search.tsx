import React from 'react'
import styled from 'styled-components'
import search from '../assets/search.png'

const SearchInput = styled.input`
  height: 30px;
  line-height: 30px;
  padding: 0 15px 0 30px;
  border: 1px solid #e3e3e3;
  color: #273849;
  outline: none;
  border-radius: 15px;
  margin-right: 10px;
  transition: border-color 0.2s ease;
  background: #fff url(${search}) 8px 5px no-repeat;
  background-size: 20px;
  vertical-align: middle !important;
  &:focus {
    border-color: #34ADB5;
  }
  &::placeholder {
    font-size: 12px;
    color: #ccc;
  }
  @media (max-width: 980px) {
    display: none;
  }
`

export default function () {

  return (
    <SearchInput placeholder='搜索文章'/>
  )
}