"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = require("winston");
const path_1 = __importDefault(require("path"));
exports.logger = (0, winston_1.createLogger)({
    level: 'info',
    format: winston_1.format.combine(winston_1.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), winston_1.format.errors({ stack: true }), winston_1.format.splat(), winston_1.format.json()),
    defaultMeta: { service: 'backend' },
    transports: [
        new winston_1.transports.File({
            filename: path_1.default.join('logs', 'error.log'),
            level: 'error'
        }),
        new winston_1.transports.File({
            filename: path_1.default.join('logs', 'combined.log')
        })
    ]
});
// Also log to console in development
if (process.env.NODE_ENV !== 'production') {
    exports.logger.add(new winston_1.transports.Console({
        format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.simple())
    }));
}
// // utils/logger.ts
// import winston from 'winston'
// import fs from 'fs'
// import path from 'path'
// // Detect if running in Vercel or serverless
// const isServerless = !!process.env.VERCEL
// // Logger transports
// const transports: winston.transport[] = [
//   new winston.transports.Console({
//     format: winston.format.simple()
//   })
// ]
// // Add file logging only if not in serverless (e.g. local dev or full server)
// if (!isServerless) {
//   const logDir = path.resolve(__dirname, '../../logs')
//   try {
//     if (!fs.existsSync(logDir)) {
//       fs.mkdirSync(logDir, { recursive: true })
//     }
//     transports.push(
//       new winston.transports.File({
//         filename: path.join(logDir, 'error.log'),
//         level: 'error'
//       }),
//       new winston.transports.File({
//         filename: path.join(logDir, 'combined.log')
//       })
//     )
//   } catch (err) {
//     console.warn('❗ Logger failed to create log directory:', err)
//   }
// }
// // Create logger
// export const logger = winston.createLogger({
//   level: 'info',
//   format: winston.format.json(),
//   transports
// })
