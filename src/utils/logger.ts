// import { createLogger, format, transports } from 'winston'
// import path from 'path'

// export const logger = createLogger({
//   level: 'info',
//   format: format.combine(
//     format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
//     format.errors({ stack: true }),
//     format.splat(),
//     format.json()
//   ),
//   defaultMeta: { service: 'backend' },
//   transports: [
//     new transports.File({
//       filename: path.join('logs', 'error.log'),
//       level: 'error'
//     }),
//     new transports.File({
//       filename: path.join('logs', 'combined.log')
//     })
//   ]
// })

// // Also log to console in development
// if (process.env.NODE_ENV !== 'production') {
//   logger.add(
//     new transports.Console({
//       format: format.combine(format.colorize(), format.simple())
//     })
//   )
// }

// utils/logger.ts
import winston from 'winston'
import fs from 'fs'
import path from 'path'

// Detect if running in Vercel or serverless
const isServerless = !!process.env.VERCEL

// Logger transports
const transports: winston.transport[] = [
  new winston.transports.Console({
    format: winston.format.simple()
  })
]

// Add file logging only if not in serverless (e.g. local dev or full server)
if (!isServerless) {
  const logDir = path.resolve(__dirname, '../../logs')

  try {
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true })
    }

    transports.push(
      new winston.transports.File({
        filename: path.join(logDir, 'error.log'),
        level: 'error'
      }),
      new winston.transports.File({
        filename: path.join(logDir, 'combined.log')
      })
    )
  } catch (err) {
    console.warn('❗ Logger failed to create log directory:', err)
  }
}

// Create logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports
})

export default logger
