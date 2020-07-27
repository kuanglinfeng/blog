import React from 'react'
import ArticleService, { IArticle } from '../../services/ArticleService'
import ArticleForm from '../../components/ArticleForm'

async function onSubmit(article: IArticle) {
  const result = await ArticleService.add(article)
  return result.data ? '' : result.error
}

function AddArticle() {
  return (
    <ArticleForm onSubmit={ onSubmit } />
  )
}

export default AddArticle
