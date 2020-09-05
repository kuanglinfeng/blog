import React from 'react'
import { NavLink } from 'react-router-dom'
import formatTime from '../utils/formatTime'
import styled from 'styled-components'
import { IArticle } from '../types/commonTypes'

type ArticleListProps = {
  borderBottom: 'none' | 'solid'
}

export const ArticleList = styled.ul`
  margin: 0;
  padding: 0 1.5em;
  border-bottom: 1px #eef2f8;
  border-bottom-style: ${ (props: ArticleListProps) => props.borderBottom };
`

export const ArticleItem = styled.li`
  font-size: 16px;
  cursor: pointer;
  list-style: none;
  margin-bottom: 10px;
  &:hover {
    color: #34ADB5;
  }
`

export const TagTitle = styled.h4`
  font-weight: 700;
`

export const DateTip = styled.span`
  color: #9eabb3;
  font-size: 14px;
`

interface IProps {
  tag: string
  articles: IArticle[]
  borderBottom: 'none' | 'solid'
}

export default function (props: IProps) {

  const { tag, articles } = props

  return (
    <>
      <TagTitle>{ '#' + tag + `(${ articles.length })` }</TagTitle>
      <ArticleList borderBottom={ props.borderBottom }>
        {
          articles.map(article => (
            <NavLink to={ `/detail/${ article._id }` } key={ article._id }>
              <ArticleItem>
                { article.title }
                <DateTip>- { formatTime(article.publishTime) }</DateTip>
              </ArticleItem>
            </NavLink>
          ))
        }
      </ArticleList>
    </>
  )
}