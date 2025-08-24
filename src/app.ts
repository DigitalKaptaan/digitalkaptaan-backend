import express, { Application } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import compression from 'compression'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { errorHandler, requestLogger } from './middlewares'
import {
  authRoutes,
  blogRoutes,
  contactRoutes,
  mediaRoutes,
  menuRoutes,
  metaRoutes,
  pageRoutes
} from './routes'
dotenv.config()

// const app = express()
const app: Application = express()

// Middlewares
app.use(express.json())
app.use(helmet())
app.use(cors({ origin: ['http://localhost:3000', 'https://www.digitalkaptaan.com'] }))
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compression())
app.use(requestLogger)

// Health check
app.get('/', (_req, res: any) => res.send('API is running 🚀'))

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/blog', blogRoutes)
app.use('/api/meta', metaRoutes)
app.use('/api/menus', menuRoutes)
app.use('/api/pages', pageRoutes)
app.use('/api/media', mediaRoutes)
app.use('/api/contact', contactRoutes)

//
app.use(errorHandler)
export default app
