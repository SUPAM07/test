import { type RequestHandler } from 'express'

import { getAppConfigStatus } from '../services/config-service'

export const getStatus: RequestHandler = (_req, res) => {
  res.status(200).json(getAppConfigStatus())
}
