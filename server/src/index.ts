import 'reflect-metadata'
import Express from 'express'
import articleRoute from './routes/articleRoute'

const app = Express()

app.use(Express.json())

app.use('/api/article', articleRoute)



app.listen(3000, () => console.log('服务已开启！'))