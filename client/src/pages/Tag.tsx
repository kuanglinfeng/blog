import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import queryString from 'query-string'
import ArticleServices from '../services/ArticleServices'
import { IArticle } from '../types/commonTypes'
import { Wrapper } from './Tags'
import TagItem from '../components/TagItem'
import Spin from '../components/loadings/Spin'

type TagSearch = {
  tag: string
}

export default function () {

  const location = useLocation()
  const [articles, setArticles] = useState<IArticle[]>([])

  const search = queryString.parse(location.search) as TagSearch

  useEffect(() => {
    (async () => {
      const result = await ArticleServices.getArticlesByTag(search.tag)
      setArticles(result.data)
    })()
  })

  return (
    articles.length === 0 ? <Spin /> :
    <Wrapper>
      <TagItem tag={ search.tag } articles={ articles } borderBottom='none' />
    </Wrapper>
  )
}