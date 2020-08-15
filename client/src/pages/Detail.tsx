import React, { useState } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { ArticleItem, PublishTime, TagItem, TagList, Title } from '../components/ArticleItem'
import ArticleServices from '../services/ArticleServices'
import { IArticle } from '../types/commonTypes'
import Markdown from '../components/Markdown'
import Spin from '../components/Loadings/Spin'

interface IParams {
  id: string
}

const DetailArticleItem = styled(ArticleItem)`
  padding: 8px;
`

const DetailTitle = styled(Title)`
  text-align: center;
  font-size: 1.6em;
  font-weight: bold;
  color: #34ADB5;
`

const DetailTagList = styled(TagList)`
  display:flex;
  justify-content: center;
`

const DetailTagItem = styled(TagItem)`
  margin: 0 5px;
  font-size: 12px;
`

const DetailPublishTime = styled(PublishTime)`
  display:flex;
  justify-content: center;
  font-size: 12px;
  
`

export default function () {

  const [article, setArticle] = useState<IArticle>()

  const { id } = useParams<IParams>()

  React.useEffect(() => {
    (async () => {
      const result = await ArticleServices.filterArticleById(id)
      setArticle(result.data)
    })()
  }, [id])

  return (
    <div>
      {
        article ?
          <DetailArticleItem>
            <DetailTitle>
              { article.title }
            </DetailTitle>
            <DetailTagList>
              {
                article.tagList.map((tag) => <DetailTagItem key={ tag }>{ tag }</DetailTagItem>)
              }
            </DetailTagList>
            <DetailPublishTime>
              { article.publishTime.toLocaleDateString ? article.publishTime.toLocaleDateString() : new Date(article.publishTime).toLocaleDateString() }
            </DetailPublishTime>
            <Markdown content={ article.content } />
          </DetailArticleItem> : <Spin />
      }
    </div>
  )
}