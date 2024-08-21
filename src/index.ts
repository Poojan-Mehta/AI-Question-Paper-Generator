import express, { Request, Response } from 'express'
import openAIRouter from './routes/openAI'
import dotenv from 'dotenv'

const app = express()
const PORT = 3000
dotenv.config()

app.use(express.json())

app.use('/openAI', openAIRouter)

app.get('/', (req: Request, res: Response) => {
    res.send(`AI Question paper generator`)
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
