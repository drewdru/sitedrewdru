import type { H3Error, H3Event } from 'h3'

export const ErrorCode = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR'
} as const

export type ErrorCodeType = typeof ErrorCode[keyof typeof ErrorCode]

export interface ErrorDetails {
  code: ErrorCodeType
  message: string
  statusCode: number
  details?: Record<string, unknown>
  timestamp?: string
}

export class AppError extends Error {
  public readonly code: ErrorCodeType
  public readonly statusCode: number
  public readonly details?: Record<string, unknown>
  public readonly timestamp: string

  constructor(params: ErrorDetails) {
    super(params.message)
    this.name = '[AppError]'
    this.code = params.code
    this.statusCode = params.statusCode
    this.details = params.details
    this.timestamp = params.timestamp || new Date().toISOString()
  }
}

export function handleError(event: H3Event, error: unknown): H3Error {
  if (isError(error)) {
    return error
  }

  if (error instanceof AppError) {
    const isValidationError = error.code === ErrorCode.VALIDATION_ERROR

    return createError({
      statusCode: error.statusCode,
      statusMessage: error.message,
      data: {
        code: error.code,
        timestamp: error.timestamp,
        ...(isValidationError && error.details?.errors ? { errors: error.details.errors } : {})
      }
    })
  }

  return createError({
    statusCode: 500,
    statusMessage: 'Internal Server Error',
    data: {
      code: ErrorCode.INTERNAL_SERVER_ERROR,
      timestamp: new Date().toISOString()
    }
  })
}

export const Errors = {
  validation: (message: string, details?: Record<string, unknown>) =>
    new AppError({
      code: ErrorCode.VALIDATION_ERROR,
      statusCode: 422,
      message,
      details
    })
}
