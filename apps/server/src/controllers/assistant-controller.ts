import { type RequestHandler } from 'express'

import { generateAssistantResponse } from '../services/assistant-service'

export const createAssistantResponse: RequestHandler = (req, res) => {
  const result = generateAssistantResponse(req.body)
  res.status(200).json(result)
}
