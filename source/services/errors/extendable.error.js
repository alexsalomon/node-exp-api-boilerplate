const HttpStatus = require('http-status')

/**
 * Class that allows important information to be added to an Error object.
 * Every custom error in this API should extend this class.
 * @extends Error
 */
class ExtendableError extends Error {
  /**
   * Creates an Extendable error.
   * @param {string} message - Error message.
   * @param {string} errors - Additional information on individual errors.
   * @param {string} stack - The error stacktrace.
   * @param {number} status - HTTP status code of error.
   * @param {boolean} isPublic - Whether the message should be visible to user or not.
   */
  constructor({
    message,
    errors,
    stack,
    status,
    isPublic,
  }) {
    super(message)
    this.name = this.constructor.name
    this.message = message
    this.errors = errors
    this.status = status
    this.isPublic = isPublic
    this.isOperational = true
    this.stack = stack || Error.captureStackTrace(this, this.constructor.name)
  }

  getFormattedError() {
    // Default error format
    let formattedError = {
      error: {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal Server Error',
      },
    }

    // Error format without app specific values that we don't want the public to see
    if (this.isPublic) {
      formattedError = {
        error: {
          status: this.status,
          message: this.message,
          errors: this.errors,
        },
      }
    }

    // Remove any keys with null, '', 0, NaN and undefined values
    Object.keys(formattedError).forEach(key => {
      if (!formattedError[key]) {
        delete formattedError[key]
      }
    })

    return formattedError
  }
}

module.exports = ExtendableError
