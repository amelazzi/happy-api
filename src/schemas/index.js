import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import { StatusCodes } from 'http-status-codes'
import { login, logout } from './authSchema'
import { HttpError } from '../errors/HttpError'

const ajv = new Ajv({ removeAdditional: true })
addFormats(ajv)

export const validateSchema = (schema) => (req, res, next) => {
  schema(req.body) ? next() : next(new HttpError(StatusCodes.BAD_REQUEST, '⚰️ body validation ❌ failed', schema.errors))
}

export const validateSchemaMap = (schemasMap, reqKey) => (req, res, next) => {
  const key = req[reqKey]
  const schema = schemasMap[key]
  schema(req.body) ? next() : next(new HttpError(StatusCodes.BAD_REQUEST, '⚰️ body validation ❌ failed', schema.errors))
}

export const schemas = {
  authLogin: ajv.compile(login),
  authLogout: ajv.compile(logout),
}
