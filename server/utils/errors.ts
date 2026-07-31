export const validationError = (
  message?: string,
  details?: {
    errorCode?: string
    errors?: { name?: string; message: string; }[]
    data?: Record<string, unknown>
  }
) =>
  createError({
    statusCode: 400,
    statusMessage: message ?? 'Validation Error',
    data: {
      ...(details?.data ?? {}),
      ...(details?.errors ? { errors: details.errors } : {}),
      ...(details?.errorCode ? { errorCode: details.errorCode } : { errorCode: 'VALIDATION_ERROR' }),
      timestamp: new Date().toISOString()
    }
  })

export const forbiddenError = (
  errorCode?: 'INVALID_SESSION' | 'FORBIDDEN_ERROR',
  details?: {
    errorCode?: string
    errors?: { name?: string; message: string }[]
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
