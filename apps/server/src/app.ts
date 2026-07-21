import cors from 'cors'
import express, { type ErrorRequestHandler } from 'express'

const app = express()

const allowedOrigin = process.env.CLIENT_ORIGIN ?? 'http://localhost:5173'

app.use(cors({ origin: allowedOrigin }))
app.use(express.json())

app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'server',
    timestamp: new Date().toISOString(),
  })
})

app.use((_req, res) => {
  res.status(404).json({ message: 'Not Found' })
})

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error(err)

  if (res.headersSent) {
    return
  }

  res.status(500).json({ message: 'Internal Server Error' })
}

app.use(errorHandler)

export default app
