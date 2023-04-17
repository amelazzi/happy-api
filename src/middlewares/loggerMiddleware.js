import morgan from 'morgan'
import { inspect } from 'util'
import { logger } from '../utils/logger'
import { environment } from '../environment'

export const morganLogger = morgan('combined', {
  stream: logger.stream,
  skip: (req, res) => environment.nodeEnv === 'production' && res.statusCode < 400,
})

export const requestLogger = (req, res, next) => {
  logger.debug(`⌚️ Timestamp: ${Date.now()}`)
  logger.debug(`🏷️ Request Type: ${req.method}`)
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
  logger.debug(`🗺️📍 Client IP: ${ip}`)
  logger.debug(
    `📦 Dump request data:\n\t- 💀 headers: ${inspect(req.headers, {
      colors: true,
    })}\n\t- ⚙️ params: ${inspect(req.params, {
      colors: true,
    })}\n\t- ⚰️ body: ${inspect(req.body, {
      colors: true,
    })}`
  )
  next()
}
