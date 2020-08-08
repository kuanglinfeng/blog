import React, { useContext } from 'react'
import styled from 'styled-components'
import ArticleItem from './ArticleItem'
import Loading from './Loading'
import { IArticleContext } from '../App'

const ArticleList = styled.div``

export default function () {

  const { state } = useContext(IArticleContext)!

  return (
    <ArticleList>
      {
        state.articles.length === 0 ? <Loading /> :
          state!.articles.map((item) =>
            (<ArticleItem
              key={ item._id }
              publishTime={ item.publishTime }
              _id={ item._id }
              title={ item.title }
              content={ item.content }
              tagList={ item.tagList }
            />))
      }
    </ArticleList>
  )
}
