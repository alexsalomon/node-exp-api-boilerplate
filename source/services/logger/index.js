/* eslint-disable no-sync */

const fse = require('fs-extra')
const winston = require('winston')
const Sentry = require('winston-sentry-raven-transport')
const config = require('../../config')

module.exports = (() => {
  createLogsDirectory()
  const loggerOptions = getLoggerOptions(config.env)
  return winston.createLogger(loggerOptions)
})()

function createLogsDirectory() {
  fse.ensureDirSync(config.logger.logsPath)
}

function getLoggerOptions(env) {
  const loggerOptions = {
    // Stop winston from exiting after logging an uncaughtException
    exitOnError: false,
  }
  loggerOptions.transports = getLoggerTransports(env)
  return loggerOptions
}

function getLoggerTransports(env) {
  let transports = []
  switch (env) {
    case 'dev':
      transports = getLoggerTransportsDev()
      break
    case 'test':
      transports = getLoggerTransportsTest()
      break
    case 'stag':
      transports = getLoggerTransportsStag()
      break
    case 'prod':
    default:
      transports = getLoggerTransportsProd()
      break
  }
  return transports
}

function getLoggerTransportsDev() {
  return [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize({ level: true }),
        winston.format.simple(),
      ),
      level: 'debug',
    }),
  ]
}

function getLoggerTransportsTest() {
  return [
    new winston.transports.File({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
      level: 'debug',
      filename: `${config.logger.logsPath}test-combined.log`,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
  ]
}

function getLoggerTransportsStag() {
  return [
    new winston.transports.File({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
      filename: `${config.logger.logsPath}error.log`,
      level: 'error',
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
    new winston.transports.File({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
      level: 'info',
      filename: `${config.logger.logsPath}combined.log`,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
  ]
}

function getLoggerTransportsProd() {
  return [...getLoggerTransportsStag, new Sentry({
    dsn: config.logger.sentry.dns,
    level: config.logger.sentry.level,
  })]
}