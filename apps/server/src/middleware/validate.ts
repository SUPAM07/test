import { type RequestHandler } from 'express'
import { ZodError, type ZodTypeAny } from 'zod'

import { AppError } from '../types/app-error'

type ValidationSchema = {
  body?: ZodTypeAny
  query?: ZodTypeAny
}

export const validate = (schema: ValidationSchema): RequestHandler => {
  return (req, _res, next) => {
    try {
      if (schema.body) {
        req.body = schema.body.parse(req.body)
      }

      if (schema.query) {
        const parsedQuery = schema.query.parse(req.query)
        Object.assign(req.query as Record<string, unknown>, parsedQuery)
      }

      next()
    } catch (error) {
      if (error instanceof ZodError) {
        next(new AppError(400, 'VALIDATION_ERROR', 'Request validation failed', error.flatten()))
        return
      }

      next(error)
    }
  }
}
