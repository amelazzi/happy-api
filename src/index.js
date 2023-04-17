import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { initializeEnvironment, environment } from './environment'
import { logger } from './utils/logger'
import { sequelize } from './database/dataSource'
import { cronJob } from './services/cronJob'
import { initSwagger } from './utils/swagger'
import { morganLogger, requestLogger } from './middlewares/loggerMiddleware'
import { extractFingerprint, extractJwt, verifyJwt } from './middlewares/jwtMiddleware'
import { error, internal, notFound } from './middlewares/errorMiddleware'
import packageJson from '../package.json' assert { type: 'json' }

const main = async () => {
  try {
    // ========================================================================== //
    //     Initialize
    // ========================================================================== //

    // ========================================================================== //
    // Initialize environment variables
    initializeEnvironment()
    logger.info('🎉 Environment variables are set and verified')
    logger.silly(`🏷️ Environment variables: ${JSON.stringify(environment)}`)

    // ========================================================================== //
    // Initialize express
    const app = express()

    // ========================================================================== //
    // Initialize database
    await sequelize.sync({ force: environment.database.forceSync })
    logger.info(`✨ Database initialized`)

    // ========================================================================== //
    // Initialize cron jobs
    if (environment.cron.enabled) {
      await cronJob()
      logger.info(`✨ Cron jobs initialized`)
    }

    // ========================================================================== //
    // Initialize Swagger
    if (environment.swagger.enabled) {
      initSwagger(app)
      logger.info(`✨ Swagger initialized`)
    }

    // ========================================================================== //
    //     Middlewares and routes logic
    // ========================================================================== //

    // ========================================================================== //
    // Preparation middlewares

    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(helmet())
    app.use(morganLogger)
    app.use(requestLogger)
    app.use(
      cors({
        origin: (_, callback) => callback(null, true),
        credentials: environment.nodeEnv !== 'production',
      })
    )
    app.use(extractJwt)
    app.use(cookieParser())
    app.use(extractFingerprint)
    app.use(verifyJwt)

    // ========================================================================== //
    // Routes

    // ========================================================================== //
    // Error handling middlewares

    app.use(notFound)
    app.use(error)
    app.use(internal)

    // ========================================================================== //
    //     Start the server
    // ========================================================================== //
    app
      .listen(environment.port, () => {
        const { name, version } = packageJson
        logger.info(`🚀 Start ${name} V${version} 👂 listening on port ${environment.port}`)
      })
      .on('error', (error) => {
        logger.error(
          `❌🛑 Error when trying to instantiate the server: ${
            (Object.keys(JSON.stringify(error)).length === 0 && JSON.stringify(error)) || error.message || error
          }`
        )
      })
  } catch (error) {
    logger.error(
      `☠️🛑 Error when trying to instantiate the server: ${
        (Object.keys(JSON.stringify(error)).length === 0 && JSON.stringify(error)) || error.message || error
      }`
    )
    process.exit(1)
  }
}
main()
