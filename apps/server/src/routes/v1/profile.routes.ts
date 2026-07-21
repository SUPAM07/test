import { Router } from 'express'

import { getProfile } from '../../controllers/profile-controller'
import { validate } from '../../middleware/validate'
import { profileQuerySchema } from '../../validation/profile'

const profileRouter = Router()

profileRouter.get('/', validate({ query: profileQuerySchema }), getProfile)

export default profileRouter
