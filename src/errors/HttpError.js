/**
 * Error definition
 * @typedef {object} Error
 * @property {number} status.required - Status
 * @property {string} message - Message
 * @property {string} stack - Stack
 */

export class HttpError extends Error {
  constructor(httpCode, message, data = {}) {
    super()
    this.httpCode = httpCode
    this.message = message
    this.data = data
  }
}
