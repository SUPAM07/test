import { Router } from 'express'

import { createAssistantResponse } from '../../controllers/assistant-controller'
import { validate } from '../../middleware/validate'
import { assistantRequestSchema } from '../../validation/assistant'

const assistantRouter = Router()

assistantRouter.post('/respond', validate({ body: assistantRequestSchema }), createAssistantResponse)

export default assistantRouter
