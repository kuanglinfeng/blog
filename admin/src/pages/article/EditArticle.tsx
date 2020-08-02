import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import ArticleService, { IArticle } from '../../services/ArticleService'
import ArticleForm from '../../components/ArticleForm'

interface IParams {
  id: string
}

export default function () {

  const { id } = useParams<IParams>()

  const [state, setState] = useState<IArticle>()

  useEffect(() => {
    (async () => {
      const result = await ArticleService.getArticleById(id)
      if (result) {
        setState({ ...result.data })
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <div>
      <ArticleForm
        article={ state }
        onSubmit={ async (article) => {
          const result = await ArticleService.edit(id, article)
          return result.data ? '' : result.error
        } }
      />
    </div>
  )
}