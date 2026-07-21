import cors from 'cors'
import express from 'express'

import { errorHandler } from './middleware/error-handler'
import { notFoundHandler } from './middleware/not-found'
import { requestLogger } from './middleware/request-logger'
import v1Router from './routes/v1'

const app = express()

const allowedOrigin = process.env.CLIENT_ORIGIN ?? 'http://localhost:5173'

app.use(cors({ origin: allowedOrigin }))
app.use(express.json())
app.use(requestLogger)

app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'server',
    timestamp: new Date().toISOString(),
  })
})

app.use('/api/v1', v1Router)

app.use(notFoundHandler)
app.use(errorHandler)

export default app
