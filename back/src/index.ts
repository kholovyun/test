import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import { db } from './repository/fileDB'
import { postsRouter } from './controllers/posts'

const app: Express = express()

const run = async () => {
    db.init()
    app.use(cors())
    app.use(express.json())
    app.use('/posts', postsRouter)
    app.listen(8000, () => {
        console.log(`Server is running on port: 8000`)
    })
}


run()
.then(() => {
    console.log('Everything is ok')
})
.catch((err: unknown) => {
    const error = err as Error
    console.log(error.message)
})