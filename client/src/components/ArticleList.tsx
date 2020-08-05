import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ArticleItem from './ArticleItem'
import ArticleServices from '../services/ArticleServices'
import { IArticle } from '../types/commonTypes'
import Loading from './Loading'

const ArticleList = styled.div`
  
`

export default function () {

  const [list, setList] = useState<IArticle[]>([])

  useEffect(() => {
    (async () => {
      const result = await ArticleServices.getArticles()
      if (!result.error) {
        // @ts-ignore
        setList(result.data)
      }
      // 服务器异常，数据没有获取到，跳转到404页面
    })()
  }, [])

  return (
    <ArticleList>
      {
        list.length === 0 ? <Loading /> :
        list!.map((item) => {
          return <ArticleItem key={item._id} publishTime={item.publishTime} _id={item._id} title={item.title} content={item.content} tagList={item.tagList} />
        })
      }
    </ArticleList>
  )
}
