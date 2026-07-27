export const TranslationErrorCode = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  FORBIDDEN_ERROR: 'FORBIDDEN_ERROR'
} as const

export const validationError = (
  message?: string,
  details?: { errorCode?: string, errors?: Record<string, string>, data?: Record<string, unknown> }
) =>
  createError({
    statusCode: 400,
    statusMessage: message ?? 'Validation Error',
    data: {
      ...(details?.data ?? {}),
      ...(details?.errors ? { errors: details?.errors } : {}),
      ...(details?.errorCode ? { errorCode: details?.errorCode } : { errorCode: TranslationErrorCode.VALIDATION_ERROR }),
      timestamp: new Date().toISOString()
    }
  })

export const forbiddenError = (
  message?: string,
  details?: { errorCode?: string, errors?: Record<string, string>, data?: Record<string, unknown> }
) =>
  createError({
    statusCode: 403,
    statusMessage: message ?? 'Forbidden',
    data: {
      ...(details?.data ?? {}),
      ...(details?.errors ? { errors: details?.errors } : {}),
      ...(details?.errorCode ? { errorCode: details?.errorCode } : { errorCode: TranslationErrorCode.FORBIDDEN_ERROR }),
      timestamp: new Date().toISOString()
    }
  })
