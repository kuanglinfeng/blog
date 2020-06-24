import Express from 'express'
import articleRoute from './routes/articleRoute'
import Article from './model/Article'

const app = Express()

app.use('/api/article', articleRoute)

const article = new Article()

console.log(article)

app.listen(3000, () => console.log('服务已开启！'))