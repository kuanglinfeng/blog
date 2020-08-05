import React from 'react'
import styled from 'styled-components'
import articleList from '../data/articleList'
import handleMarkDownText from '../utils/handleMarkDownText'
import { NavLink as Link } from 'react-router-dom'

const data = articleList[0]

const ArticleItem = styled.div`
  background: #fff;
  border-radius: 4px;
  padding: 8px 16px;
  margin-bottom: 10px;
  color: #888;
`

const Title = styled.h2`
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

const TimeTagWrapper = styled.span`
  font-size: 12px;
  display:flex;
  align-items: center;
`

const PublishTime = styled.span`

`

const TagList = styled.ul`
  padding: 0;
  margin: 8px 0;
  display:flex;
  font-size: 12px;
  align-items: center;
  line-height: 1.5em;
`
const TagItem = styled.li`
  padding: 2px;
  background: #f6f6f6;
  margin-left: 1em;
`


export default function () {

  return (
    <ArticleItem>
      <Title>
        <Link to={`/detail/${data._id}`}>
          {data.title}
        </Link>
      </Title>
      <TimeTagWrapper>
        <PublishTime>{data.publishTime.toLocaleDateString()}</PublishTime>

        <TagList>
          <TagItem>{data.tagList[0]}</TagItem>
          <TagItem>{data.tagList[1]}</TagItem>
        </TagList>

      </TimeTagWrapper>
      <Content>{handleMarkDownText(data.content).slice(0, 500).concat('...')}</Content>

    </ArticleItem>
  )
}
