import Express from 'express'
import articleRoute from './routes/articleRoute'
import Article from './model/Article'
import { validate } from 'class-validator'

const app = Express()

app.use('/api/article', articleRoute)

const article = new Article()

article.title = '12345'
article.content = '123'
article.publishTime = new Date()

validate(article).then(errors => {
  console.log(errors)
})

app.listen(3000, () => console.log('服务已开启！'))