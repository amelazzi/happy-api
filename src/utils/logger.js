import winston from 'winston'
import { environment } from '../environment'

const options = {
  level: environment.logLevel || 'debug',
}

export const logger = winston.createLogger({
  level: options.level,
  format: winston.format.combine(
    winston.format.splat(),
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.json(),
    winston.format.colorize(),
    winston.format.printf((log) => `📆⌚️ ${log.timestamp} - 🔈 ${log.level}: ${log.message}`)
  ),
  transports: [new winston.transports.Console()],
  exceptionHandlers: [new winston.transports.Console()],
})

// Use with morgan
logger.stream = {
  write: (message) => {
    logger.info(message)
  },
}
