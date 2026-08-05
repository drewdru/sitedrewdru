export const validationError = (
  details?: {
    errorCode?: string
    errors?: { name?: string, message: string }[]
    data?: Record<string, unknown>
  }
) =>
  createError({
    statusCode: 400,
    statusMessage: 'Validation Error',
    data: {
      ...(details?.data ?? {}),
      ...(details?.errors ? { errors: details.errors } : {}),
      ...(details?.errorCode ? { errorCode: details.errorCode } : { errorCode: 'VALIDATION_ERROR' }),
      timestamp: new Date().toISOString()
    }
  })

export const notFoundError = (
  errorCode?: 'NOT_FOUND',
  details?: {
    errorCode?: string
    errors?: { name?: string, message: string }[]
    data?: Record<string, unknown>
  }
) =>
  createError({
    statusCode: 404,
    statusMessage: 'Not found',
    data: {
      ...(details?.data ?? {}),
      ...(details?.errors ? { errors: details.errors } : {}),
      ...(details?.errorCode ? { errorCode: details.errorCode } : { errorCode: errorCode ?? 'FORBIDDEN_ERROR' }),
      timestamp: new Date().toISOString()
    }
  })

export const forbiddenError = (
  errorCode?: 'INVALID_SESSION' | 'FORBIDDEN_ERROR',
  details?: {
    errorCode?: string
    errors?: { name?: string, message: string }[]
    data?: Record<string, unknown>
  }
) =>
  createError({
    statusCode: 403,
    statusMessage: 'Forbidden',
    data: {
      ...(details?.data ?? {}),
      ...(details?.errors ? { errors: details.errors } : {}),
      ...(details?.errorCode ? { errorCode: details.errorCode } : { errorCode: errorCode ?? 'FORBIDDEN_ERROR' }),
      timestamp: new Date().toISOString()
    }
  })

export const internalServerError = (
  errorCode: 'INTERNAL_SERVER_ERROR'
    // | 'DATABASE_ERROR'
    // | 'EXTERNAL_SERVICE_ERROR'
    // | 'CONFIGURATION_ERROR'
    = 'INTERNAL_SERVER_ERROR',
  details?: {
    errorCode?: string
    errors?: { name?: string, message: string }[]
    data?: Record<string, unknown>
  }
) =>
  createError({
    statusCode: 500,
    statusMessage: 'Internal Server Error',
    data: {
      ...(details?.data ?? {}),
      ...(details?.errors ? { errors: details.errors } : {}),
      ...(details?.errorCode ? { errorCode: details.errorCode } : { errorCode: errorCode ?? 'FORBIDDEN_ERROR' }),
      timestamp: new Date().toISOString()
    }
  })
