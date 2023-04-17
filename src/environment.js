import dotenv from 'dotenv'
dotenv.config()

const validateAndParseInt = (value, defaultValue = undefined) => {
  if (value === undefined) {
    return defaultValue
  }
  const parsedValue = parseInt(value)
  if (isNaN(parsedValue)) {
    throw new Error(`🏷️❌ Invalid value ${value} for environment variable`)
  }
  return parsedValue
}

const validateAndParseBoolean = (value, defaultValue = undefined) => {
  if (value === undefined) {
    return defaultValue
  }
  if (value.toLowerCase() === 'true') {
    return true
  }
  if (value.toLowerCase() === 'false') {
    return false
  }
  throw new Error(`🏷️❌ Invalid value ${value} for environment variable`)
}

export const environment = Object.freeze({
  nodeEnv: process.env.NODE_ENV,
  logLevel: process.env.LOG_LEVEL || 'silly',
  port: validateAndParseInt(process.env.PORT),
  swagger: {
    enabled: validateAndParseBoolean(process.env.SWAGGER_ENABLED, false),
    path: process.env.SWAGGER_PATH,
  },
  cron: {
    enabled: validateAndParseBoolean(process.env.CRON_ENABLED),
    cleanTokensInterval: process.env.CRON_CLEAN_TOKENS_INTERVAL,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    accessTokenExpiresIn: validateAndParseInt(process.env.JWT_ACCESS_TOKEN_EXPIRES_IN),
    refreshTokenExpiresIn: validateAndParseInt(process.env.JWT_REFRESH_TOKEN_EXPIRES_IN),
    fingerprintExpiresIn: validateAndParseInt(process.env.JWT_FINGERPRINT_EXPIRES_IN),
  },
  database: {
    host: process.env.DATABASE_HOST,
    port: validateAndParseInt(process.env.DATABASE_PORT),
    name: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    forceSync: validateAndParseBoolean(process.env.DATABASE_FROCE_SYNC, false),
  },
})

const verifyenviroment = (env) => {
  const keys = Object.keys(env)
  for (const key of keys) {
    if (typeof env[key] === 'object') {
      verifyenviroment(env[key])
    } else if (env[key] === undefined) {
      throw new Error(`🏷️❓ Environment variable "${key}" is not set`)
    }
  }
}

export const initializeEnvironment = () => {
  dotenv.config()
  verifyenviroment(environment)
}
