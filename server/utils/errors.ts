import { constants } from 'node:http2'

import type en from '~~/i18n/locales/en'

type ValidationKeys = keyof typeof en.serverErrors.validation
type NotFoundKeys = keyof typeof en.serverErrors.notFound
type ForbiddenKeys = keyof typeof en.serverErrors.forbidden
type InternalErrorKeys = keyof typeof en.serverErrors.internal
type ConflictKeys = keyof typeof en.serverErrors.conflict

type ErrorDetails = {
  errorCode?: string
  errors?: { name?: string, message: string }[]
  data?: Record<string, unknown>
}

export const createErrorData = (
  errorCode: string,
  details?: ErrorDetails
) => ({
  ...(details?.data ?? {}),
  ...(details?.errors ? { errors: details.errors } : {}),
  errorCode: details?.errorCode ?? errorCode,
  timestamp: new Date().toISOString()
})

export const validationError = (
  errorCode: ValidationKeys = 'VALIDATION_ERROR',
  details?: ErrorDetails
) =>
  createError({
    statusCode: constants.HTTP_STATUS_BAD_REQUEST,
    statusMessage: 'Bad Request',
    data: createErrorData(errorCode, details)
  })

export const notFoundError = (
  errorCode: NotFoundKeys = 'NOT_FOUND',
  details?: ErrorDetails
) =>
  createError({
    statusCode: constants.HTTP_STATUS_NOT_FOUND,
    statusMessage: 'Not found',
    data: createErrorData(errorCode, details)
  })

export const forbiddenError = (
  errorCode: ForbiddenKeys = 'FORBIDDEN_ERROR',
  details?: ErrorDetails
) =>
  createError({
    statusCode: constants.HTTP_STATUS_FORBIDDEN,
    statusMessage: 'Forbidden',
    data: createErrorData(errorCode, details)
  })

export const internalServerError = (
  errorCode: InternalErrorKeys = 'INTERNAL_SERVER_ERROR',
  details?: ErrorDetails
) =>
  createError({
    statusCode: constants.HTTP_STATUS_INTERNAL_SERVER_ERROR,
    statusMessage: 'Internal Server Error',
    data: createErrorData(errorCode, details)
  })

export const conflictError = (
  errorCode: ConflictKeys = 'CONFLICT_ERROR',
  details?: ErrorDetails
) =>
  createError({
    statusCode: constants.HTTP_STATUS_CONFLICT,
    statusMessage: 'Internal Server Error',
    data: createErrorData(errorCode, details)
  })
