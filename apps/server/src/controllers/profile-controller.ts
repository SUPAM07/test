import { type RequestHandler } from 'express'

import { getUserProfile } from '../services/profile-service'

export const getProfile: RequestHandler = (req, res) => {
  const includePreferences = req.query.includePreferences !== 'false'
  const profile = getUserProfile()

  if (!includePreferences) {
    res.status(200).json({
      ...profile,
      preferences: undefined,
    })
    return
  }

  res.status(200).json(profile)
}
