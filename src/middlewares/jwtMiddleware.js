import { createHash } from 'crypto'
import { verify } from 'jsonwebtoken'
import { environment } from '../environment'
import { asyncHandler } from '../utils/async'
import { logger } from '../utils/logger'

export const extractJwt = asyncHandler(async (req, res, next) => {
  req.jwt && delete req.jwt
  const jwt = req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer' && req.headers.authorization.split(' ')[1]
  if (jwt) {
    req.jwt = jwt
    logger.debug(`🎉 🔑 Token ${req.jwt} is in request`)
  }
  next()
})

export const extractFingerprint = asyncHandler(async (req, res, next) => {
  req.fingerprint && delete req.fingerprint
  const fingerprint = req.cookies && req.cookies.fingerprint
  if (fingerprint) {
    req.fingerprint = fingerprint
    logger.debug(`🎉 🔑 Fingerprint ${req.fingerprint} is in request`)
  }
  next()
})

export const verifyJwt = asyncHandler(async (req, res, next) => {
  req.jwtPayload && delete req.jwtPayload
  if (req.jwt) {
    try {
      const payload = verify(req.jwt, environment.jwt.secret, { algorithms: ['HS256'] })
      logger.debug(`🎉 🔑 Token ${req.jwt} is ✅ valid => ${JSON.stringify(payload)}`)
      if (payload.fingerprint && req.fingerprint) {
        const hashedFingerprint = createHash('sha256').update(fingerprint).digest('hex')
        if (payload.fingerprint !== hashedFingerprint) {
          logger.error(`❌ 🔑 Token ${req.jwt} with 🔑 fingerprint ${req.fingerprint} is ❌ not valid : fingerprint mismatch`)
        }
        logger.debug(`🎊 🔑 Token ${req.jwt} with 🔑 fingerprint ${req.fingerprint} is ✅ valid => ${JSON.stringify(req.jwtPayload)}`)
      } else if (payload.fingerprint && !req.fingerprint) {
        logger.error(`❌ 🔑 Token ${req.jwt} is ❌ not valid : fingerprint is missing`)
      }
      req.jwtPayload = payload
    } catch (error) {
      logger.error(`❌ 🔑 Token ${req.jwt} with 🔑 fingerprint ${req.fingerprint} is ❌ not valid : ${error}\n ${error.stack}`)
    }
  }
  next()
})
