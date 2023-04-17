import { StatusCodes, getReasonPhrase } from 'http-status-codes'
import { logger } from '../utils/logger'
import { HttpError } from '../errors/HttpError '
import { environment } from '../environment'

export const notFound = (req, res, next) => {
  next(new HttpError(StatusCodes.NOT_FOUND, `🛣️ Route ${req.method.toUpperCase()}:${req.path} 🕵️🗺️❓ ${getReasonPhrase(StatusCodes.NOT_FOUND)}`))
}

export const error = (error, req, res, next) => {
  if (error && error.statusCode) {
    logger.error(`❌ Error handler: error ${error.statusCode} ✊ raised => ${error.stack}\nat ${req.url} (${req.method})`)
    const data = { status: getReasonPhrase(error.statusCode), message: error.type }
    if (environment.nodeEnv !== 'production') {
      data.stack = error.stack
    }
    res.status(error.statusCode).json(data)
  } else if (!res.headersSent && error) {
    logger.error(`❌ Error handler: error ${error.httpCode} ✊ raised => ${error.stack}\nat ${req.url} (${req.method})`)
    const data = { status: getReasonPhrase(error.httpCode), message: error.message, data: error.data }
    if (environment.nodeEnv !== 'production') {
      data.stack = error.stack
    }
    res.status(error.httpCode).json(data)
  }
}

export const internal = (error, req, res, next) => {
  logger.error(`❌☠️ Error handler: error ${StatusCodes.INTERNAL_SERVER_ERROR} ✊ raised ${error.stack}\nat ${req.url} (${req.method})`)
  const data = { status: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) }
  if (environment.nodeEnv !== 'production') {
    data.stack = error.stack
  }
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(data)
}
