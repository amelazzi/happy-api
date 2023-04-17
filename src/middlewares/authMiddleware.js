import { StatusCodes } from 'http-status-codes'
import { logger } from '../utils/logger'
import { HttpError } from '../errors/HttpError '
import { authWithJwt } from '../controllers/AuthController'

export const jwtAuth = async (req, res, next) => {
  if (req.jwtPayload) {
    const userInfo = await authWithJwt(req.jwt, req.jwtPayload)
    if (userInfo) {
      logger.debug(`🎊 User is 🔐 auth => ${JSON.stringify(userInfo)}`)
      req.userInfo = userInfo
      next()
    } else {
      throw new HttpError(StatusCodes.UNAUTHORIZED, '🚫🔑 Invalid Token')
    }
  } else {
    throw new HttpError(StatusCodes.UNAUTHORIZED, '🚫🔑 Invalid Token')
  }
}
