import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ArticleServices from '../services/ArticleServices'
import { IArticle } from '../types/commonTypes'
import { useHistory } from 'react-router-dom'
import Spin from '../components/loadings/Spin'
import TagItem from '../components/TagItem'

export const Wrapper = styled.div`
  padding: 20px;
  background: #fff;
`

interface ITagProps {
  color?: string
  backgroundColor?: string
  borderColor?: string
}

const TagWrapper = styled.ul`
  padding: 8px 0;
`

const Title = styled.h3`
  margin-top: 10px;
  margin-bottom: 20px;
`

const Tag = styled.li<ITagProps>`
  display: inline-block;
  height: auto;
  margin: 0 8px 8px 0;
  padding: 0 7px;
  font-size: 14px;
  line-height: 20px;
  white-space: nowrap;
  cursor: pointer;
  border-width: 1px;
  border-style: solid;
  border-radius: 2px;
  color: ${ props => props.color || '#eb2f96' };
  background-color: ${ props => props.backgroundColor || '#fff0f6' };
  border-color: ${ props => props.borderColor || '#ffadd2' };
`

const tagColorHash = [
  { color: '#eb2f96', backgroundColor: '#fff0f6', borderColor: '#ffadd2' },
  { color: '#eb2f96', backgroundColor: '#fff0f6', borderColor: '#ffadd2' },
  { color: '#52c41a', backgroundColor: '#f6ffed', borderColor: '#b7eb8f' },
  { color: '#13c2c2', backgroundColor: '#e6fffb', borderColor: '#87e8de' },
  { color: '#faad14', backgroundColor: '#fffbe6', borderColor: '#ffe58f' },
  { color: '#722ed1', backgroundColor: '#f9f0ff', borderColor: '#d3adf7' },
  { color: '#1890ff', backgroundColor: '#e6f7ff', borderColor: '#91d5ff' }
]

interface ArticleHash {
  [key: string]: IArticle[]
}

export default function () {

  const [articlesHash, setArticlesHash] = useState<ArticleHash>({})
  const history = useHistory()

  useEffect(() => {
    (async () => {
      const result = await ArticleServices.getArticlesByAllTag()
      setArticlesHash(result.data)
    })()
  }, [])


  const showSortedArticles = (articlesHash: ArticleHash) => {
    const cache = []
    const tags = Object.keys(articlesHash)
    if (tags.length === 0) return <Spin />
    cache.push(<div key={ 'fuck' + tags.length }>
      <Title>我的标签</Title>
      <TagWrapper>
        { tags!.map((tag) => {
          return (
            <Tag key={ tag } { ...tagColorHash[tag.length % 7] } onClick={ () => {
              history.push(`/tag?tag=${ tag }`)
            } }>{ tag }</Tag>
          )
        }) }
      </TagWrapper>
    </div>)
    for (let tagTitle in articlesHash) {
      if (articlesHash.hasOwnProperty(tagTitle)) {
        const articles = articlesHash[tagTitle]
        cache.push(<div key={ tagTitle }>
          <TagItem tag={ tagTitle } articles={ articles } borderBottom='solid' />
        </div>)
      }
    }
    return <Wrapper>{ cache }</Wrapper>
  }

  return (
    <>
      { showSortedArticles(articlesHash) }
    </>
  )
}