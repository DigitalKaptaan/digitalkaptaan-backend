import express from 'express'
import { validate } from '../middlewares'
import { login, register } from '../controllers'
import { registerSchema } from '../validators'

const router = express.Router()

router.post('/register', validate(registerSchema), register)
router.post('/login', login)

export default router
