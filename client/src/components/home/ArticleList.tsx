import React, { useContext } from 'react'
import styled from 'styled-components'
import ArticleItem from './ArticleItem'
import Loading from '../loadings/Loading'
import { IArticleContext } from '../../App'
import Footer from '../../components/Footer'


const ArticleList = styled.div``

export default function () {

  const { state } = useContext(IArticleContext)!

  return (
    <ArticleList>
      {
        state.articles.length === 0 ? <Loading /> :
          <div>
            {
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
            <Footer />
          </div>
      }
    </ArticleList>
  )
}
