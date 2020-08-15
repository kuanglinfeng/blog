import React from 'react'
import styled from 'styled-components'
import handleMarkDownText from '../utils/handleMarkDownText'
import { NavLink as Link } from 'react-router-dom'
import { IArticle } from '../types/commonTypes'

export const ArticleItem = styled.div`
  background: #fff;
  border-radius: 4px;
  padding: 8px 16px;
  margin-bottom: 10px;
  color: #888;
`

export const Title = styled.h2`
  font-size: 1.2em;
  font-weight: normal;
  margin: 0.5em 0;
  line-height: 1.5em;
  color: #304455;
  & > a:hover {
    color: #34ADB5;
    cursor: pointer;
  }
`

const Content = styled.p`
  margin: 0.75em 0;
  line-height: 1.8em;
  font-size: 13px;
`

export const TimeTagWrapper = styled.span`
  font-size: 12px;
  display:flex;
  align-items: center;
`

export const PublishTime = styled.span``

export const TagList = styled.ul`
  padding: 0;
  margin: 8px 0;
  display:flex;
  font-size: 12px;
  align-items: center;
  line-height: 1.5em;
  list-style: none;
`
export const TagItem = styled.li`
  background: #f6f6f6;
  margin-left: 1em;
  padding: 0 7px;
  border-radius: 2px;
`

export default function (props: IArticle) {
  return (
    <ArticleItem>
      <Title>
        <Link to={ `/detail/${ props._id }` }>
          { props.title }
        </Link>
      </Title>
      <TimeTagWrapper>
        <PublishTime>
          { props.publishTime.toLocaleDateString ? props.publishTime.toLocaleDateString() : new Date(props.publishTime).toLocaleDateString() }
        </PublishTime>
        <TagList>
          {
            props.tagList.map((tag) => <TagItem key={ tag }>{ tag }</TagItem>)
          }
        </TagList>
      </TimeTagWrapper>
      <Content>{ handleMarkDownText(props.content) }</Content>
    </ArticleItem>
  )
}
