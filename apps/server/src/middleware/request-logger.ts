import { type RequestHandler } from 'express'

export const requestLogger: RequestHandler = (req, res, next) => {
  const startedAt = Date.now()

  res.on('finish', () => {
    const elapsedMs = Date.now() - startedAt
    console.info(`${req.method} ${req.originalUrl} ${res.statusCode} ${elapsedMs}ms`)
  })

  next()
}
