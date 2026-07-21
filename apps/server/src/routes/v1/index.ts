import { Router } from 'express'

import assistantRouter from './assistant.routes'
import profileRouter from './profile.routes'
import statusRouter from './status.routes'

const v1Router = Router()

v1Router.use('/assistant', assistantRouter)
v1Router.use('/profile', profileRouter)
v1Router.use('/status', statusRouter)

export default v1Router
