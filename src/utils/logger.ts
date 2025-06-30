import { createLogger, format, transports } from 'winston'
import path from 'path'

export const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: 'backend' },
  transports: [
    new transports.File({
      filename: path.join('logs', 'error.log'),
      level: 'error'
    }),
    new transports.File({
      filename: path.join('logs', 'combined.log')
    })
  ]
})

// Also log to console in development
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple())
    })
  )
}
