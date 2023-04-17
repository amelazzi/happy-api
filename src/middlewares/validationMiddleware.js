import { StatusCodes } from 'http-status-codes'
import { HttpError } from '../errors/HttpError'

export const validationParamTypes = {
  int: 'int',
  float: 'float',
  boolean: 'boolean',
  date: 'date',
  string: 'string',
}

const validateParams = (validationParams, paramsToCheck) => {
  for (const key in validationParams) {
    const param = paramsToCheck[key]
    if (!param) {
      throw new HttpError(StatusCodes.BAD_REQUEST, `❌ Invalid parameter ${key}`)
    } else if (validationParams[key] instanceof RegExp && !validationParams[key].test(param)) {
      throw new HttpError(StatusCodes.BAD_REQUEST, `❌ Invalid parameter ${key} not matching regex ${validationParams[key]}`)
    } else if (validationParams[key] === validationParamTypes.int && isNaN(parseInt(param))) {
      throw new HttpError(StatusCodes.BAD_REQUEST, `❌ Invalid parameter ${key} is not an int`)
    } else if (validationParams[key] === validationParamTypes.float && isNaN(parseFloat(param))) {
      throw new HttpError(StatusCodes.BAD_REQUEST, `❌ Invalid parameter ${key} is not a float`)
    } else if (validationParams[key] === validationParamTypes.boolean && param.toLowerCase() !== 'true' && param.toLowerCase() !== 'false') {
      throw new HttpError(StatusCodes.BAD_REQUEST, `❌ Invalid parameter ${key} is not a boolean`)
    } else if (validationParams[key] === validationParamTypes.date && isNaN(Date.parse(param))) {
      throw new HttpError(StatusCodes.BAD_REQUEST, `❌ Invalid parameter ${key} is not a date`)
    }
  }
}

export const validatePathParams = (validationParams) => (req, res, next) => {
  validateParams(validationParams, req.params)
  next()
}

export const validateQueryParams = (validationParams) => (req, res, next) => {
  validateParams(validationParams, req.query)
  next()
}
