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

const allowedOrigins = [
  'http://localhost:3000',
  'https://digitalkaptaan.com',
  'https://www.digitalkaptaan.com',
  'https://codewithsachin.in',
  'https://www.codewithsachin.in'
]
// Middlewares
app.use(express.json())
app.use(helmet())

const corsOptions = {
  origin: (origin: string | undefined, callback: any) => {
    if (!origin) return callback(null, true) // allow server-to-server, Postman
    const normalizedOrigin = origin.replace(/\/$/, '') // remove trailing slash
    if (allowedOrigins.includes(normalizedOrigin)) {
      return callback(null, true)
    } else {
      return callback(new Error(`CORS not allowed from ${origin}`), false)
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With']
}

app.use(cors(corsOptions))
// handle preflight requests
// app.options('*', cors(corsOptions))

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compression())
app.use(requestLogger)

app.use((req, _res, next) => {
  console.log('Request origin:', req.headers.origin)
  next()
})

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
